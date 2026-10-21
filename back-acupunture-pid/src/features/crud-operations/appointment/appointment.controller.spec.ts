import { AppointmentController } from './appointment.controller';
import { AppointmentStatus } from './appointment-status.enum';

describe('AppointmentController', () => {
  const entity = {
    appointment_id: 'ap-1',
    acupuncturist_id: 'acu-1',
    service_id: 'srv-1',
    patient_id: 'pat-1',
    clinic_id: 'cli-1',
    start_datetime: new Date('2026-11-01T10:00:00Z'),
    end_datetime: new Date('2026-11-01T11:00:00Z'),
    status: AppointmentStatus.SCHEDULED,
    internal: 'não deve sair',
  };
  let create: { execute: jest.Mock };
  let update: { execute: jest.Mock };
  let byPatient: { execute: jest.Mock };
  let byAcupuncturist: { execute: jest.Mock };
  let byPatientName: { execute: jest.Mock };
  let controller: AppointmentController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    update = { execute: jest.fn().mockResolvedValue(entity) };
    byPatient = { execute: jest.fn().mockResolvedValue([entity]) };
    byAcupuncturist = { execute: jest.fn().mockResolvedValue([entity]) };
    byPatientName = { execute: jest.fn().mockResolvedValue([entity]) };
    controller = new AppointmentController(
      create as any,
      update as any,
      byPatient as any,
      byAcupuncturist as any,
      byPatientName as any,
    );
  });

  it('create devolve o agendamento mapeado', async () => {
    const dto = { patient_id: 'pat-1' } as any;

    const result = await controller.create(dto);

    expect(create.execute).toHaveBeenCalledWith(dto);
    expect(result.appointment_id).toBe('ap-1');
    expect(result).not.toHaveProperty('internal');
  });

  it('update repassa id e dto', async () => {
    const dto = { status: AppointmentStatus.CONFIRMED } as any;

    const result = await controller.update('ap-1', dto);

    expect(update.execute).toHaveBeenCalledWith('ap-1', dto);
    expect(result.appointment_id).toBe('ap-1');
  });

  it('getByPatient converte o período para Date', async () => {
    const result = await controller.getByPatient('pat-1', '2026-11-01', '2026-11-30');

    expect(byPatient.execute).toHaveBeenCalledWith('pat-1', new Date('2026-11-01'), new Date('2026-11-30'));
    expect(result).toHaveLength(1);
    expect(result[0]).not.toHaveProperty('internal');
  });

  it('getByPatient envia undefined quando não há período', async () => {
    await controller.getByPatient('pat-1');

    expect(byPatient.execute).toHaveBeenCalledWith('pat-1', undefined, undefined);
  });

  it('getByAcupuncturist converte o período para Date', async () => {
    await controller.getByAcupuncturist('acu-1', undefined, '2026-11-30');

    expect(byAcupuncturist.execute).toHaveBeenCalledWith('acu-1', undefined, new Date('2026-11-30'));
  });

  it('searchByPatientName repassa o nome', async () => {
    const result = await controller.searchByPatientName('Ana');

    expect(byPatientName.execute).toHaveBeenCalledWith('Ana');
    expect(result[0].appointment_id).toBe('ap-1');
  });
});
