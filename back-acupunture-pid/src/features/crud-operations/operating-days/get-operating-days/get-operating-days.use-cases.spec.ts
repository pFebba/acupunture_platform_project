import { NotFoundException } from '@nestjs/common';
import { GetOperatingDayByClinicAndDayUseCase } from './get-operating-day-by-clinic-and-day.use-case';
import { GetOperatingDaysByClinicUseCase } from './get-operating-days-by-clinic.use-case';

describe('Get operating days use cases', () => {
  const day = { clinic_id: 'cli-1', day_of_week: 1, is_open: true };

  it('GetOperatingDaysByClinicUseCase lista os dias da clínica', async () => {
    const repository = { findByClinic: jest.fn().mockResolvedValue([day]) };

    await expect(new GetOperatingDaysByClinicUseCase(repository as any).execute('cli-1')).resolves.toEqual([day]);
    expect(repository.findByClinic).toHaveBeenCalledWith('cli-1');
  });

  describe('GetOperatingDayByClinicAndDayUseCase', () => {
    it('retorna o dia encontrado', async () => {
      const repository = { findByClinicAndDay: jest.fn().mockResolvedValue(day) };

      await expect(new GetOperatingDayByClinicAndDayUseCase(repository as any).execute('cli-1', 1)).resolves.toBe(day);
      expect(repository.findByClinicAndDay).toHaveBeenCalledWith('cli-1', 1);
    });

    it('lança NotFoundException quando não encontra', async () => {
      const repository = { findByClinicAndDay: jest.fn().mockResolvedValue(null) };

      await expect(
        new GetOperatingDayByClinicAndDayUseCase(repository as any).execute('cli-1', 1),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
