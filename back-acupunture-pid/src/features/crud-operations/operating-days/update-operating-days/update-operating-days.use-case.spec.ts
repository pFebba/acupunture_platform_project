import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateOperatingDaysUseCase } from './update-operating-days.use-case';

describe('UpdateOperatingDaysUseCase', () => {
  const existing = {
    clinic_id: 'cli-1',
    day_of_week: 1,
    is_open: true,
    opening_time: '08:00',
    closing_time: '18:00',
  } as any;
  let repository: { findByClinicAndDay: jest.Mock; updateByClinicAndDay: jest.Mock };
  let useCase: UpdateOperatingDaysUseCase;

  beforeEach(() => {
    repository = {
      findByClinicAndDay: jest.fn().mockResolvedValue(existing),
      updateByClinicAndDay: jest.fn(),
    };
    useCase = new UpdateOperatingDaysUseCase(repository as any);
  });

  it('lança NotFoundException quando o dia não existe', async () => {
    repository.findByClinicAndDay.mockResolvedValue(null);

    await expect(useCase.execute('cli-1', 1, {})).rejects.toBeInstanceOf(NotFoundException);
  });

  it('atualiza apenas os horários informados', async () => {
    const updated = { ...existing, closing_time: '20:00' };
    repository.updateByClinicAndDay.mockResolvedValue(updated);

    await expect(useCase.execute('cli-1', 1, { closing_time: '20:00' })).resolves.toBe(updated);
    expect(repository.updateByClinicAndDay).toHaveBeenCalledWith('cli-1', 1, { closing_time: '20:00' });
  });

  it('valida o novo horário contra o horário existente', async () => {
    await expect(useCase.execute('cli-1', 1, { opening_time: '19:00' })).rejects.toBeInstanceOf(BadRequestException);
    expect(repository.updateByClinicAndDay).not.toHaveBeenCalled();
  });

  it('permite fechar o dia sem validar horários', async () => {
    repository.findByClinicAndDay.mockResolvedValue({ ...existing, opening_time: null, closing_time: null });

    await useCase.execute('cli-1', 1, { is_open: false });

    expect(repository.updateByClinicAndDay).toHaveBeenCalledWith('cli-1', 1, { is_open: false });
  });

  it('exige horários ao reabrir um dia sem horários cadastrados', async () => {
    repository.findByClinicAndDay.mockResolvedValue({ ...existing, is_open: false, opening_time: null, closing_time: null });

    await expect(useCase.execute('cli-1', 1, { is_open: true })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('retorna o registro atual sem atualizar quando nada foi informado', async () => {
    await expect(useCase.execute('cli-1', 1, {})).resolves.toBe(existing);
    expect(repository.updateByClinicAndDay).not.toHaveBeenCalled();
  });

  it('retorna o registro atual quando o update não devolve nada', async () => {
    repository.updateByClinicAndDay.mockResolvedValue(null);

    await expect(useCase.execute('cli-1', 1, { opening_time: '09:00' })).resolves.toBe(existing);
  });
});
