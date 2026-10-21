import { BadRequestException, ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateAppointmentUseCase } from './create-appointment.use-case';
import { CreateAppointmentDTO } from './create-appointment.dto';
import { AppointmentStatus } from '../appointment-status.enum';

const UUID = '3f2504e0-4f89-41d3-9a0c-0305e82c3301';

describe('CreateAppointmentUseCase', () => {
  const dto: CreateAppointmentDTO = {
    acupuncturist_id: 'acu-1',
    service_id: 'srv-1',
    patient_id: 'pat-1',
    clinic_id: 'cli-1',
    start_datetime: '2026-11-01T10:00:00.000Z',
    end_datetime: '2026-11-01T11:00:00.000Z',
    status: AppointmentStatus.SCHEDULED,
  };
  let repository: { findByPatient: jest.Mock; create: jest.Mock };
  let useCase: CreateAppointmentUseCase;

  beforeEach(() => {
    repository = { findByPatient: jest.fn().mockResolvedValue([]), create: jest.fn() };
    useCase = new CreateAppointmentUseCase(repository as any);
  });

  it('cria o agendamento convertendo as datas', async () => {
    const created = { appointment_id: 'ap-1' };
    repository.create.mockResolvedValue(created);

    await expect(useCase.execute(dto)).resolves.toBe(created);
    expect(repository.findByPatient).toHaveBeenCalledWith('pat-1');
    expect(repository.create).toHaveBeenCalledWith({
      acupuncturist_id: 'acu-1',
      service_id: 'srv-1',
      patient_id: 'pat-1',
      clinic_id: 'cli-1',
      start_datetime: new Date(dto.start_datetime),
      end_datetime: new Date(dto.end_datetime),
      status: AppointmentStatus.SCHEDULED,
    });
  });

  it.each([
    ['igual ao início', '2026-11-01T10:00:00.000Z'],
    ['anterior ao início', '2026-11-01T09:00:00.000Z'],
  ])('lança BadRequestException quando o fim é %s', async (_, end_datetime) => {
    await expect(useCase.execute({ ...dto, end_datetime })).rejects.toBeInstanceOf(BadRequestException);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('lança ConflictException quando o paciente já possui agendamento', async () => {
    repository.findByPatient.mockResolvedValue([{ appointment_id: 'ap-0' }]);

    await expect(useCase.execute(dto)).rejects.toThrow(
      new ConflictException('Um agendamento já foi marcado para este paciente'),
    );
    expect(repository.create).not.toHaveBeenCalled();
  });
});

describe('CreateAppointmentDTO', () => {
  const payload = {
    acupuncturist_id: UUID,
    service_id: UUID,
    patient_id: UUID,
    clinic_id: UUID,
    start_datetime: '2026-11-01T10:00:00.000Z',
    end_datetime: '2026-11-01T11:00:00.000Z',
  };

  it('usa SCHEDULED como status padrão', () => {
    const dto = plainToInstance(CreateAppointmentDTO, payload);

    expect(dto.status).toBe(AppointmentStatus.SCHEDULED);
    expect(validateSync(dto)).toHaveLength(0);
  });

  it('rejeita ids que não são UUID, datas inválidas e status desconhecido', () => {
    const dto = plainToInstance(CreateAppointmentDTO, {
      ...payload,
      patient_id: '123',
      start_datetime: 'amanhã',
      status: 'PENDENTE',
    });

    expect(validateSync(dto).map((e) => e.property).sort()).toEqual(['patient_id', 'start_datetime', 'status']);
  });
});
