import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let auth: { signIn: jest.Mock };
  let signInService: { signIn: jest.Mock };
  let controller: AuthController;

  beforeEach(() => {
    auth = { signIn: jest.fn() };
    signInService = { signIn: jest.fn() };
    controller = new AuthController(auth as any, signInService as any);
  });

  it('autentica e cria a sessão com método password', async () => {
    auth.signIn.mockResolvedValue({ id: 'a1' });
    signInService.signIn.mockResolvedValue({ session: { mfa: 'none' } });

    const result = await controller.signIn({ email: 'ana@mail.com', password: '123456' });

    expect(auth.signIn).toHaveBeenCalledWith('ana@mail.com', '123456');
    expect(signInService.signIn).toHaveBeenCalledWith('a1', { method: 'password' });
    expect(result).toEqual({ mfaRequired: false });
  });

  it('indica MFA obrigatório quando a sessão está pendente', async () => {
    auth.signIn.mockResolvedValue({ id: 'a1' });
    signInService.signIn.mockResolvedValue({ session: { mfa: 'pending' } });

    await expect(controller.signIn({ email: 'ana@mail.com', password: '123456' })).resolves.toEqual({
      mfaRequired: true,
    });
  });

  it('não cria sessão quando as credenciais são inválidas', async () => {
    auth.signIn.mockRejectedValue(new UnauthorizedException());

    await expect(controller.signIn({ email: 'ana@mail.com', password: 'x' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(signInService.signIn).not.toHaveBeenCalled();
  });
});
