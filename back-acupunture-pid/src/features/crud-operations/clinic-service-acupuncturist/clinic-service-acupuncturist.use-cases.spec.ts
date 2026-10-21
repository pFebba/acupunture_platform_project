import { NotFoundException } from '@nestjs/common';
import { CreateClinicServiceAcupuncturistUseCase } from './create-clinic-service-acupuncturist/create-clinic-service-acupuncturist.use-case';
import { DeleteClinicServiceAcupuncturistUseCase } from './delete-clinic-service-acupuncturist/delete-clinic-service-acupuncturist.use-case';
import { GetClinicServiceAcupuncturistUseCase } from './get-clinic-service-acupuncturist/get-clinic-service-acupuncturist.use-case';
import { UpdateClinicServiceAcupuncturistUseCase } from './update-clinic-service-acupuncturist/update-clinic-service-acupuncturist.use-case';

describe('ClinicServiceAcupuncturist use cases', () => {
  const record = { clinic_id: 'cli-1', service_id: 'srv-1', acupuncturist_id: 'acu-1', price: 150 };
  let repository: Record<string, jest.Mock>;

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(record),
      findByClinicAndAcupuncturist: jest.fn().mockResolvedValue([record]),
      updatePrice: jest.fn(),
      deleteByCompositeKey: jest.fn(),
    };
  });

  it('CreateClinicServiceAcupuncturistUseCase cria o vínculo com preço', async () => {
    await expect(
      new CreateClinicServiceAcupuncturistUseCase(repository as any).execute({ ...record } as any),
    ).resolves.toBe(record);
    expect(repository.create).toHaveBeenCalledWith(record);
  });

  it('GetClinicServiceAcupuncturistUseCase busca por clínica e acupunturista', async () => {
    await expect(
      new GetClinicServiceAcupuncturistUseCase(repository as any).execute('cli-1', 'acu-1'),
    ).resolves.toEqual([record]);
    expect(repository.findByClinicAndAcupuncturist).toHaveBeenCalledWith('cli-1', 'acu-1');
  });

  describe('UpdateClinicServiceAcupuncturistUseCase', () => {
    const execute = (serviceId = 'srv-1') =>
      new UpdateClinicServiceAcupuncturistUseCase(repository as any).execute('cli-1', serviceId, 'acu-1', {
        price: 200,
      } as any);

    it('atualiza o preço do serviço', async () => {
      const updated = { ...record, price: 200 };
      repository.updatePrice.mockResolvedValue(updated);

      await expect(execute()).resolves.toBe(updated);
      expect(repository.updatePrice).toHaveBeenCalledWith('cli-1', 'srv-1', 'acu-1', 200);
    });

    it('retorna o registro atual quando o update não devolve nada', async () => {
      repository.updatePrice.mockResolvedValue(null);

      await expect(execute()).resolves.toBe(record);
    });

    it('lança NotFoundException quando o serviço não está vinculado', async () => {
      await expect(execute('srv-outro')).rejects.toBeInstanceOf(NotFoundException);
      expect(repository.updatePrice).not.toHaveBeenCalled();
    });
  });

  describe('DeleteClinicServiceAcupuncturistUseCase', () => {
    it('remove o vínculo pela chave composta', async () => {
      repository.deleteByCompositeKey.mockResolvedValue(true);

      await new DeleteClinicServiceAcupuncturistUseCase(repository as any).execute('cli-1', 'srv-1', 'acu-1');

      expect(repository.deleteByCompositeKey).toHaveBeenCalledWith('cli-1', 'srv-1', 'acu-1');
    });

    it('lança NotFoundException quando o vínculo não existe', async () => {
      repository.deleteByCompositeKey.mockResolvedValue(false);

      await expect(
        new DeleteClinicServiceAcupuncturistUseCase(repository as any).execute('cli-1', 'srv-1', 'acu-1'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
