import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateServiceUseCase } from './create-service/create-service.use-case';
import { DeleteServiceUseCase } from './delete-service/delete-service.use-case';
import { GetServiceUseCase } from './get-service/get-service.use-case';
import { ListServicesUseCase } from './get-service/list-services.use-case';
import { UpdateServiceUseCase } from './update-service/update-service.use-case';

describe('Service use cases', () => {
  const service = { service_id: 'srv-1', type: 'Acupuntura' } as any;
  let repository: Record<string, jest.Mock>;

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(service),
      findAll: jest.fn().mockResolvedValue([service]),
      findById: jest.fn().mockResolvedValue(service),
      findByType: jest.fn().mockResolvedValue(null),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('CreateServiceUseCase cria o serviço pelo tipo', async () => {
    await expect(new CreateServiceUseCase(repository as any).execute('Acupuntura')).resolves.toBe(service);
    expect(repository.create).toHaveBeenCalledWith({ type: 'Acupuntura' });
  });

  it('ListServicesUseCase lista os serviços', async () => {
    await expect(new ListServicesUseCase(repository as any).execute()).resolves.toEqual([service]);
  });

  describe('GetServiceUseCase', () => {
    it('retorna o serviço encontrado', async () => {
      await expect(new GetServiceUseCase(repository as any).execute('srv-1')).resolves.toBe(service);
    });

    it('lança NotFoundException quando não encontra', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(new GetServiceUseCase(repository as any).execute('srv-1')).rejects.toThrow(
        new NotFoundException('Serviço não encontrado'),
      );
    });
  });

  describe('UpdateServiceUseCase', () => {
    const execute = (dto: object) => new UpdateServiceUseCase(repository as any).execute('srv-1', dto as any);

    it('lança NotFoundException quando o serviço não existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(execute({ type: 'Ventosa' })).rejects.toBeInstanceOf(NotFoundException);
    });

    it('atualiza o tipo do serviço', async () => {
      const updated = { ...service, type: 'Ventosa' };
      repository.update.mockResolvedValue(updated);

      await expect(execute({ type: 'Ventosa' })).resolves.toBe(updated);
      expect(repository.findByType).toHaveBeenCalledWith('Ventosa');
      expect(repository.update).toHaveBeenCalledWith('srv-1', { type: 'Ventosa' });
    });

    it('lança ConflictException quando o tipo já existe', async () => {
      repository.findByType.mockResolvedValue({ service_id: 'srv-2', type: 'Ventosa' });

      await expect(execute({ type: 'Ventosa' })).rejects.toBeInstanceOf(ConflictException);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('não verifica duplicidade quando o tipo não mudou', async () => {
      repository.update.mockResolvedValue(service);

      await execute({ type: 'Acupuntura' });

      expect(repository.findByType).not.toHaveBeenCalled();
    });

    it('retorna o registro atual sem atualizar quando o tipo não foi informado', async () => {
      await expect(execute({})).resolves.toBe(service);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('retorna o registro atual quando o update não devolve nada', async () => {
      repository.update.mockResolvedValue(null);

      await expect(execute({ type: 'Ventosa' })).resolves.toBe(service);
    });
  });

  describe('DeleteServiceUseCase', () => {
    it('remove o serviço', async () => {
      repository.delete.mockResolvedValue(true);

      await expect(new DeleteServiceUseCase(repository as any).execute('srv-1')).resolves.toBeUndefined();
    });

    it('lança NotFoundException quando nada foi removido', async () => {
      repository.delete.mockResolvedValue(false);

      await expect(new DeleteServiceUseCase(repository as any).execute('srv-1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
