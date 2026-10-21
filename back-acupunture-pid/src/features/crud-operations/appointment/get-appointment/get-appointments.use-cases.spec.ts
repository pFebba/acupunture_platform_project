import { GetAppointmentsByPatientUseCase } from './get-appointments-by-patient.use-case';
import { GetAppointmentsByAcupuncturistUseCase } from './get-appointments-by-acupuncturist.use-case';
import { GetAppointmentsByPatientNameUseCase } from './get-appointments-by-patient-name.use-case';

describe('Get appointment use cases', () => {
  const appointments = [{ appointment_id: 'ap-1' }];
  const from = new Date('2026-11-01T00:00:00Z');
  const to = new Date('2026-11-30T00:00:00Z');
  let repository: { findByPatient: jest.Mock; findByAcupuncturist: jest.Mock; findByPatientName: jest.Mock };

  beforeEach(() => {
    repository = {
      findByPatient: jest.fn().mockResolvedValue(appointments),
      findByAcupuncturist: jest.fn().mockResolvedValue(appointments),
      findByPatientName: jest.fn().mockResolvedValue(appointments),
    };
  });

  it('GetAppointmentsByPatientUseCase repassa paciente e período', async () => {
    const useCase = new GetAppointmentsByPatientUseCase(repository as any);

    await expect(useCase.execute('pat-1', from, to)).resolves.toBe(appointments);
    expect(repository.findByPatient).toHaveBeenCalledWith('pat-1', from, to);
  });

  it('GetAppointmentsByAcupuncturistUseCase repassa acupunturista e período', async () => {
    const useCase = new GetAppointmentsByAcupuncturistUseCase(repository as any);

    await expect(useCase.execute('acu-1', from)).resolves.toBe(appointments);
    expect(repository.findByAcupuncturist).toHaveBeenCalledWith('acu-1', from, undefined);
  });

  it('GetAppointmentsByPatientNameUseCase busca pelo nome do paciente', async () => {
    const useCase = new GetAppointmentsByPatientNameUseCase(repository as any);

    await expect(useCase.execute('Ana')).resolves.toBe(appointments);
    expect(repository.findByPatientName).toHaveBeenCalledWith('Ana');
  });
});
