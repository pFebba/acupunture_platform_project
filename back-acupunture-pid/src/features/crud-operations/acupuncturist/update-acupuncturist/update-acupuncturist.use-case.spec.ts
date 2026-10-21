import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateAcupuncturistUseCase } from './update-acupuncturist.use-case';

describe('UpdateAcupuncturistUseCase', () => {
  const existing = { id: 'a1', name: 'Ana', email: 'ana@mail.com', cpf: '52998224725', phone: '1' } as any;
  let repository: { findById: jest.Mock; findByEmail: jest.Mock; findByCpf: jest.Mock; update: jest.Mock };
  let passwordHasher: { hash: jest.Mock };
  let useCase: UpdateAcupuncturistUseCase;

  beforeEach(() => {
    repository = {
      findById: jest.fn().mockResolvedValue(existing),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByCpf: jest.fn().mockResolvedValue(null),
      update: jest.fn(),
    };
    passwordHasher = { hash: jest.fn().mockResolvedValue('new-hash') };
    useCase = new UpdateAcupuncturistUseCase(repository as any, passwordHasher as any);
  });

  it('lança NotFoundException quando o acupunturista não existe', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute('a1', { name: 'X' })).rejects.toBeInstanceOf(NotFoundException);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('atualiza apenas os campos informados', async () => {
    const updated = { ...existing, name: 'Ana Maria', phone: '2' };
    repository.update.mockResolvedValue(updated);

    await expect(useCase.execute('a1', { name: 'Ana Maria', phone: '2' })).resolves.toBe(updated);
    expect(repository.update).toHaveBeenCalledWith('a1', { name: 'Ana Maria', phone: '2' });
  });

  it('criptografa a nova senha', async () => {
    await useCase.execute('a1', { password: 'nova-senha' });

    expect(passwordHasher.hash).toHaveBeenCalledWith('nova-senha');
    expect(repository.update).toHaveBeenCalledWith('a1', { password_hash: 'new-hash' });
  });

  it('retorna o registro atual sem atualizar quando nada foi informado', async () => {
    await expect(useCase.execute('a1', {})).resolves.toBe(existing);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('retorna o registro atual quando o update não devolve nada', async () => {
    repository.update.mockResolvedValue(null);

    await expect(useCase.execute('a1', { name: 'Outra' })).resolves.toBe(existing);
  });

  it('lança ConflictException quando o novo e-mail já está em uso', async () => {
    repository.findByEmail.mockResolvedValue({ id: 'a2' });

    await expect(useCase.execute('a1', { email: 'bia@mail.com' })).rejects.toThrow(
      new ConflictException('Usuário já cadastrado com este e-mail'),
    );
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('lança ConflictException quando o novo CPF já está em uso', async () => {
    repository.findByCpf.mockResolvedValue({ id: 'a2' });

    await expect(useCase.execute('a1', { cpf: '11144477735' })).rejects.toThrow(
      new ConflictException('Usuário já cadastrado com este CPF'),
    );
  });

  it('não verifica duplicidade quando e-mail e CPF não mudaram', async () => {
    await useCase.execute('a1', { email: existing.email, cpf: existing.cpf });

    expect(repository.findByEmail).not.toHaveBeenCalled();
    expect(repository.findByCpf).not.toHaveBeenCalled();
  });
});
