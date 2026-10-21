import { ConflictException } from '@nestjs/common';
import { CreateAcupuncturistUseCase } from './create-acupuncturist.use-case';
import { CreateAcupuncturistDTO } from './create-acupuncturist.dto';

describe('CreateAcupuncturistUseCase', () => {
  const dto: CreateAcupuncturistDTO = {
    name: 'Ana',
    cpf: '52998224725',
    email: 'ana@mail.com',
    emailVerified: false,
    password: '123456',
    phone: '11999999999',
  };
  let repository: { findByEmail: jest.Mock; create: jest.Mock };
  let passwordHasher: { hash: jest.Mock };
  let useCase: CreateAcupuncturistUseCase;

  beforeEach(() => {
    repository = { findByEmail: jest.fn(), create: jest.fn() };
    passwordHasher = { hash: jest.fn().mockResolvedValue('hashed') };
    useCase = new CreateAcupuncturistUseCase(repository as any, passwordHasher as any);
  });

  it('cria o acupunturista com a senha criptografada', async () => {
    const created = { id: 'a1', ...dto };
    repository.findByEmail.mockResolvedValue(null);
    repository.create.mockResolvedValue(created);

    await expect(useCase.execute(dto)).resolves.toBe(created);
    expect(passwordHasher.hash).toHaveBeenCalledWith('123456');
    expect(repository.create).toHaveBeenCalledWith({
      name: 'Ana',
      cpf: '52998224725',
      email: 'ana@mail.com',
      phone: '11999999999',
      password_hash: 'hashed',
    });
  });

  it('nunca persiste a senha em texto puro', async () => {
    repository.findByEmail.mockResolvedValue(null);

    await useCase.execute(dto);

    expect(repository.create.mock.calls[0][0]).not.toHaveProperty('password');
  });

  it('lança ConflictException quando o e-mail já está cadastrado', async () => {
    repository.findByEmail.mockResolvedValue({ id: 'outro' });

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(passwordHasher.hash).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });
});
