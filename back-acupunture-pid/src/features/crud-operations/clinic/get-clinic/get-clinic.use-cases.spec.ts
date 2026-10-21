import { NotFoundException } from '@nestjs/common';
import { GetClinicUseCase } from './get-clinic.use-case';
import { ListClinicsUseCase } from './list-clinics.use-case';

describe('GetClinicUseCase', () => {
  it('retorna a clínica encontrada', async () => {
    const clinic = { clinic_id: 'cli-1' };
    const repository = { findById: jest.fn().mockResolvedValue(clinic) };

    await expect(new GetClinicUseCase(repository as any).execute('cli-1')).resolves.toBe(clinic);
    expect(repository.findById).toHaveBeenCalledWith('cli-1');
  });

  it('lança NotFoundException quando não encontra', async () => {
    const repository = { findById: jest.fn().mockResolvedValue(null) };

    await expect(new GetClinicUseCase(repository as any).execute('cli-1')).rejects.toThrow(
      new NotFoundException('Clínica não encontrada'),
    );
  });
});

describe('ListClinicsUseCase', () => {
  it('retorna todas as clínicas', async () => {
    const clinics = [{ clinic_id: 'cli-1' }];
    const repository = { findAll: jest.fn().mockResolvedValue(clinics) };

    await expect(new ListClinicsUseCase(repository as any).execute()).resolves.toBe(clinics);
  });
});
