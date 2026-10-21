import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateAppointmentUseCase } from './update-appointment.use-case';
import { AppointmentStatus } from '../appointment-status.enum';

describe('UpdateAppointmentUseCase', () => {
  const existing = {
    appointment_id: 'ap-1',
    start_datetime: new Date('2026-11-01T10:00:00Z'),
    end_datetime: new Date('2026-11-01T11:00:00Z'),
    status: 'scheduled',
  } as any;
  let repository: { findById: jest.Mock; update: jest.Mock };
  let useCase: UpdateAppointmentUseCase;

  beforeEach(() => {
    repository = { findById: jest.fn().mockResolvedValue(existing), update: jest.fn() };
    useCase = new UpdateAppointmentUseCase(repository as any);
  });

  it('lança NotFoundException quando o agendamento não existe', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute('ap-1', {} as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('atualiza as datas e converte o status para minúsculas', async () => {
    const updated = { ...existing, status: 'completed' };
    repository.update.mockResolvedValue(updated);

    const result = await useCase.execute('ap-1', {
      start_datetime: '2026-11-02T10:00:00Z',
      end_datetime: '2026-11-02T12:00:00Z',
      status: AppointmentStatus.COMPLETED,
    });

    expect(result).toBe(updated);
    expect(repository.update).toHaveBeenCalledWith('ap-1', {
      start_datetime: new Date('2026-11-02T10:00:00Z'),
      end_datetime: new Date('2026-11-02T12:00:00Z'),
      status: 'completed',
    });
  });

  it('valida o novo fim contra o início existente', async () => {
    await expect(
      useCase.execute('ap-1', { end_datetime: '2026-11-01T09:00:00Z' } as any),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('valida o novo início contra o fim existente', async () => {
    await expect(
      useCase.execute('ap-1', { start_datetime: '2026-11-01T11:00:00Z' } as any),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('retorna o registro atual quando o update não devolve nada', async () => {
    repository.update.mockResolvedValue(null);

    await expect(useCase.execute('ap-1', { status: AppointmentStatus.CANCELLED } as any)).resolves.toBe(existing);
  });
});
