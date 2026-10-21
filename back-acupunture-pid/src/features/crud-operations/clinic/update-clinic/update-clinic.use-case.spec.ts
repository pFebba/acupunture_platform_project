import { NotFoundException } from '@nestjs/common';
import { UpdateClinicUseCase } from './update-clinic.use-case';

describe('UpdateClinicUseCase', () => {
  const existing = { clinic_id: 'cli-1', name: 'Zen', city: 'SP', zip_code: '01000-000', address: 'Rua A' } as any;
  let repository: { findById: jest.Mock; update: jest.Mock };
  let useCase: UpdateClinicUseCase;

  beforeEach(() => {
    repository = { findById: jest.fn().mockResolvedValue(existing), update: jest.fn() };
    useCase = new UpdateClinicUseCase(repository as any);
  });

  it('lança NotFoundException quando a clínica não existe', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute('cli-1', { name: 'X' } as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('atualiza apenas os campos informados', async () => {
    const updated = { ...existing, name: 'Zen 2', logo: 'novo.png' };
    repository.update.mockResolvedValue(updated);

    await expect(useCase.execute('cli-1', { name: 'Zen 2', logo: 'novo.png' } as any)).resolves.toBe(updated);
    expect(repository.update).toHaveBeenCalledWith('cli-1', { name: 'Zen 2', logo: 'novo.png' });
  });

  it('atualiza cidade, CEP e endereço', async () => {
    await useCase.execute('cli-1', { city: 'RJ', zip_code: '20000-000', address: 'Rua B' } as any);

    expect(repository.update).toHaveBeenCalledWith('cli-1', { city: 'RJ', zip_code: '20000-000', address: 'Rua B' });
  });

  it('retorna o registro atual sem atualizar quando nada foi informado', async () => {
    await expect(useCase.execute('cli-1', {} as any)).resolves.toBe(existing);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('retorna o registro atual quando o update não devolve nada', async () => {
    repository.update.mockResolvedValue(null);

    await expect(useCase.execute('cli-1', { name: 'X' } as any)).resolves.toBe(existing);
  });
});
