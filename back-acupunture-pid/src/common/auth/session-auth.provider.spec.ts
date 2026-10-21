import { SessionAuth } from './session-auth.provider';

describe('SessionAuth', () => {
  it('registra-se no AuthenticationRegistry ao ser criado', () => {
    const registry = { registerProvider: jest.fn() };
    const provider = new SessionAuth({ findById: jest.fn() } as any, registry as any);

    expect(registry.registerProvider).toHaveBeenCalledWith(provider);
  });

  it('valida a sessão buscando o acupunturista pelo userId', async () => {
    const acupuncturist = { id: 'a1' };
    const repository = { findById: jest.fn().mockResolvedValue(acupuncturist) };
    const provider = new SessionAuth(repository as any, { registerProvider: jest.fn() } as any);

    const result = await (provider as any).validate({ userId: 'a1' });

    expect(repository.findById).toHaveBeenCalledWith('a1');
    expect(result).toBe(acupuncturist);
  });
});
