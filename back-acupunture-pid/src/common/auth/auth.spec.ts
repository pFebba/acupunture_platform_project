import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Auth } from './auth';

describe('Auth', () => {
  const acupuncturist = { id: 'a1', email: 'ana@mail.com', password_hash: 'hash' } as any;
  let repository: { findByEmail: jest.Mock; update: jest.Mock };
  let passwordHasher: { verify: jest.Mock; needsRehash: jest.Mock };
  let auth: Auth;

  beforeEach(() => {
    repository = { findByEmail: jest.fn(), update: jest.fn() };
    passwordHasher = { verify: jest.fn(), needsRehash: jest.fn().mockReturnValue(false) };
    auth = new Auth(repository as any, passwordHasher as any);
  });

  it('retorna o acupunturista quando as credenciais são válidas', async () => {
    repository.findByEmail.mockResolvedValue(acupuncturist);
    passwordHasher.verify.mockReturnValue(true);

    await expect(auth.signIn('ana@mail.com', '123456')).resolves.toBe(acupuncturist);
    expect(repository.findByEmail).toHaveBeenCalledWith('ana@mail.com');
    expect(passwordHasher.verify).toHaveBeenCalledWith('123456', 'hash');
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('lança NotFoundException quando o e-mail não existe', async () => {
    repository.findByEmail.mockResolvedValue(null);

    await expect(auth.signIn('x@mail.com', '123456')).rejects.toBeInstanceOf(NotFoundException);
    expect(passwordHasher.verify).not.toHaveBeenCalled();
  });

  it('lança UnauthorizedException quando a senha é inválida', async () => {
    repository.findByEmail.mockResolvedValue(acupuncturist);
    passwordHasher.verify.mockReturnValue(false);

    await expect(auth.signIn('ana@mail.com', 'errada')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('atualiza o acupunturista quando o hash precisa ser refeito', async () => {
    repository.findByEmail.mockResolvedValue(acupuncturist);
    passwordHasher.verify.mockReturnValue(true);
    passwordHasher.needsRehash.mockReturnValue(true);

    await auth.signIn('ana@mail.com', '123456');

    expect(repository.update).toHaveBeenCalledWith('a1', acupuncturist);
  });
});
