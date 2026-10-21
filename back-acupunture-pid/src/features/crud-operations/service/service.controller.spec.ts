import { ServiceController } from './service.controller';

describe('ServiceController', () => {
  const entity = { service_id: 'srv-1', type: 'Acupuntura', internal: 'x' };
  let create: { execute: jest.Mock };
  let get: { execute: jest.Mock };
  let list: { execute: jest.Mock };
  let update: { execute: jest.Mock };
  let remove: { execute: jest.Mock };
  let controller: ServiceController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    get = { execute: jest.fn().mockResolvedValue(entity) };
    list = { execute: jest.fn().mockResolvedValue([entity]) };
    update = { execute: jest.fn().mockResolvedValue(entity) };
    remove = { execute: jest.fn() };
    controller = new ServiceController(create as any, get as any, list as any, update as any, remove as any);
  });

  it('create repassa o tipo', async () => {
    const result = await controller.create({ type: 'Acupuntura' } as any);

    expect(create.execute).toHaveBeenCalledWith('Acupuntura');
    expect({ ...result }).toEqual({ service_id: 'srv-1', type: 'Acupuntura' });
  });

  it('list mapeia os serviços', async () => {
    const result = await controller.list();

    expect(result.map((r) => ({ ...r }))).toEqual([{ service_id: 'srv-1', type: 'Acupuntura' }]);
  });

  it('getById busca pelo id', async () => {
    await controller.getById('srv-1');

    expect(get.execute).toHaveBeenCalledWith('srv-1');
  });

  it('update repassa id e dto', async () => {
    const dto = { type: 'Ventosa' } as any;

    await controller.update('srv-1', dto);

    expect(update.execute).toHaveBeenCalledWith('srv-1', dto);
  });

  it('delete chama o caso de uso de exclusão', async () => {
    await controller.delete('srv-1');

    expect(remove.execute).toHaveBeenCalledWith('srv-1');
  });
});
