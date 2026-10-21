import { ClinicServiceAcupuncturistController } from './clinic-service-acupuncturist.controller';

describe('ClinicServiceAcupuncturistController', () => {
  const entity = { clinic_id: 'cli-1', service_id: 'srv-1', acupuncturist_id: 'acu-1', price: 150 };
  let create: { execute: jest.Mock };
  let get: { execute: jest.Mock };
  let update: { execute: jest.Mock };
  let remove: { execute: jest.Mock };
  let controller: ClinicServiceAcupuncturistController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    get = { execute: jest.fn().mockResolvedValue([entity]) };
    update = { execute: jest.fn().mockResolvedValue({ ...entity, price: 200 }) };
    remove = { execute: jest.fn() };
    controller = new ClinicServiceAcupuncturistController(create as any, get as any, update as any, remove as any);
  });

  it('create repassa o dto', async () => {
    const dto = { ...entity } as any;

    const result = await controller.create(dto);

    expect(create.execute).toHaveBeenCalledWith(dto);
    expect(result.price).toBe(150);
  });

  it('getByClinicAndAcupuncturist busca e mapeia', async () => {
    const result = await controller.getByClinicAndAcupuncturist('cli-1', 'acu-1');

    expect(get.execute).toHaveBeenCalledWith('cli-1', 'acu-1');
    expect(result[0].service_id).toBe('srv-1');
  });

  it('update repassa a chave composta e o dto', async () => {
    const dto = { price: 200 } as any;

    const result = await controller.update('cli-1', 'srv-1', 'acu-1', dto);

    expect(update.execute).toHaveBeenCalledWith('cli-1', 'srv-1', 'acu-1', dto);
    expect(result.price).toBe(200);
  });

  it('delete repassa a chave composta', async () => {
    await controller.delete('cli-1', 'srv-1', 'acu-1');

    expect(remove.execute).toHaveBeenCalledWith('cli-1', 'srv-1', 'acu-1');
  });
});
