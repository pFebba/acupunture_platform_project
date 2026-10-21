import { NotFoundException } from '@nestjs/common';
import { CreateClinicAcupuncturistUseCase } from './create-clinic-acupuncturist/create-clinic-acupuncturist.use-case';
import { DeleteClinicAcupuncturistUseCase } from './delete-clinic-acupuncturist/delete-clinic-acupuncturist.use-case';
import { GetClinicAcupuncturistByAcupuncturistUseCase } from './get-clinic-acupuncturist/get-clinic-acupuncturist-by-acupuncturist.use-case';
import { GetClinicAcupuncturistByClinicUseCase } from './get-clinic-acupuncturist/get-clinic-acupuncturist-by-clinic.use-case';

describe('ClinicAcupuncturist use cases', () => {
  const link = { clinic_id: 'cli-1', acupuncturist_id: 'acu-1' };
  let repository: Record<string, jest.Mock>;

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(link),
      findByClinic: jest.fn().mockResolvedValue([link]),
      findByAcupuncturist: jest.fn().mockResolvedValue([link]),
      deleteByCompositeKey: jest.fn(),
    };
  });

  it('CreateClinicAcupuncturistUseCase vincula clínica e acupunturista', async () => {
    await expect(new CreateClinicAcupuncturistUseCase(repository as any).execute('cli-1', 'acu-1')).resolves.toBe(
      link,
    );
    expect(repository.create).toHaveBeenCalledWith(link);
  });

  it('GetClinicAcupuncturistByClinicUseCase busca pela clínica', async () => {
    await expect(new GetClinicAcupuncturistByClinicUseCase(repository as any).execute('cli-1')).resolves.toEqual([
      link,
    ]);
    expect(repository.findByClinic).toHaveBeenCalledWith('cli-1');
  });

  it('GetClinicAcupuncturistByAcupuncturistUseCase busca pelo acupunturista', async () => {
    await expect(
      new GetClinicAcupuncturistByAcupuncturistUseCase(repository as any).execute('acu-1'),
    ).resolves.toEqual([link]);
    expect(repository.findByAcupuncturist).toHaveBeenCalledWith('acu-1');
  });

  describe('DeleteClinicAcupuncturistUseCase', () => {
    it('remove o vínculo pela chave composta', async () => {
      repository.deleteByCompositeKey.mockResolvedValue(true);

      await expect(
        new DeleteClinicAcupuncturistUseCase(repository as any).execute('cli-1', 'acu-1'),
      ).resolves.toBeUndefined();
      expect(repository.deleteByCompositeKey).toHaveBeenCalledWith('cli-1', 'acu-1');
    });

    it('lança NotFoundException quando o vínculo não existe', async () => {
      repository.deleteByCompositeKey.mockResolvedValue(false);

      await expect(
        new DeleteClinicAcupuncturistUseCase(repository as any).execute('cli-1', 'acu-1'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
