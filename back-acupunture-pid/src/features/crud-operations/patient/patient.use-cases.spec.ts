import { NotFoundException } from '@nestjs/common';
import { CreatePatientUseCase } from './create-patient/create-patient.use-case';
import { DeletePatientUseCase } from './delete-patient/delete-patient.use-case';
import { GetPatientUseCase } from './get-patient/get-patient.use-case';
import { ListPatientsUseCase } from './get-patient/list-patients.use-case';
import { UpdatePatientUseCase } from './update-patient/update-patient.use-case';

describe('Patient use cases', () => {
  const patient = { id: 'pat-1', name: 'Carlos', phone: '11999999999', email: 'c@mail.com' } as any;
  let repository: Record<string, jest.Mock>;

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(patient),
      findAll: jest.fn().mockResolvedValue([patient]),
      findById: jest.fn().mockResolvedValue(patient),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('CreatePatientUseCase cria o paciente com todos os campos', async () => {
    await expect(
      new CreatePatientUseCase(repository as any).execute('Carlos', '11999999999', 'adulto', 'c@mail.com', 'foto.png'),
    ).resolves.toBe(patient);
    expect(repository.create).toHaveBeenCalledWith({
      name: 'Carlos',
      phone: '11999999999',
      age_profile: 'adulto',
      email: 'c@mail.com',
      profile_photo: 'foto.png',
    });
  });

  it('ListPatientsUseCase lista os pacientes', async () => {
    await expect(new ListPatientsUseCase(repository as any).execute()).resolves.toEqual([patient]);
  });

  describe('GetPatientUseCase', () => {
    it('retorna o paciente encontrado', async () => {
      await expect(new GetPatientUseCase(repository as any).execute('pat-1')).resolves.toBe(patient);
      expect(repository.findById).toHaveBeenCalledWith('pat-1');
    });

    it('lança NotFoundException quando não encontra', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(new GetPatientUseCase(repository as any).execute('pat-1')).rejects.toThrow(
        new NotFoundException('Paciente não encontrado'),
      );
    });
  });

  describe('UpdatePatientUseCase', () => {
    const execute = (dto: object) => new UpdatePatientUseCase(repository as any).execute('pat-1', dto as any);

    it('lança NotFoundException quando o paciente não existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(execute({ name: 'X' })).rejects.toBeInstanceOf(NotFoundException);
    });

    it('atualiza apenas os campos informados', async () => {
      const updated = { ...patient, name: 'Carlos Silva' };
      repository.update.mockResolvedValue(updated);

      await expect(
        execute({ name: 'Carlos Silva', age_profile: 'idoso', phone: '2', email: 'n@mail.com', profile_photo: 'p.png' }),
      ).resolves.toBe(updated);
      expect(repository.update).toHaveBeenCalledWith('pat-1', {
        name: 'Carlos Silva',
        age_profile: 'idoso',
        phone: '2',
        email: 'n@mail.com',
        profile_photo: 'p.png',
      });
    });

    it('retorna o registro atual sem atualizar quando nada foi informado', async () => {
      await expect(execute({})).resolves.toBe(patient);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('retorna o registro atual quando o update não devolve nada', async () => {
      repository.update.mockResolvedValue(null);

      await expect(execute({ name: 'X' })).resolves.toBe(patient);
    });
  });

  describe('DeletePatientUseCase', () => {
    it('remove o paciente', async () => {
      repository.delete.mockResolvedValue(true);

      await expect(new DeletePatientUseCase(repository as any).execute('pat-1')).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith('pat-1');
    });

    it('lança NotFoundException quando nada foi removido', async () => {
      repository.delete.mockResolvedValue(false);

      await expect(new DeletePatientUseCase(repository as any).execute('pat-1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
