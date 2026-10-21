import { ClinicController } from './clinic.controller';

describe('ClinicController', () => {
  const entity = {
    clinic_id: 'cli-1',
    name: 'Zen',
    logo: 'logo.png',
    city: 'SP',
    zip_code: '01000-000',
    address: 'Rua A',
    internal: 'não deve sair',
  };
  let create: { execute: jest.Mock };
  let get: { execute: jest.Mock };
  let list: { execute: jest.Mock };
  let update: { execute: jest.Mock };
  let remove: { execute: jest.Mock };
  let controller: ClinicController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    get = { execute: jest.fn().mockResolvedValue(entity) };
    list = { execute: jest.fn().mockResolvedValue([entity]) };
    update = { execute: jest.fn().mockResolvedValue(entity) };
    remove = { execute: jest.fn() };
    controller = new ClinicController(create as any, get as any, list as any, update as any, remove as any);
  });

  it('create desmonta o dto nos parâmetros do caso de uso', async () => {
    const result = await controller.create({
      name: 'Zen',
      city: 'SP',
      zip_code: '01000-000',
      address: 'Rua A',
      logo: 'logo.png',
    } as any);

    expect(create.execute).toHaveBeenCalledWith('Zen', 'SP', '01000-000', 'Rua A', 'logo.png');
    expect({ ...result }).toEqual({ clinic_id: 'cli-1', name: 'Zen', city: 'SP', address: 'Rua A' });
  });

  it('list mapeia as clínicas', async () => {
    const [result] = await controller.list();

    expect(result).not.toHaveProperty('internal');
    expect(result.zip_code).toBe('01000-000');
  });

  it('getById busca pelo id', async () => {
    const result = await controller.getById('cli-1');

    expect(get.execute).toHaveBeenCalledWith('cli-1');
    expect(result.clinic_id).toBe('cli-1');
  });

  it('update repassa id e dto', async () => {
    const dto = { name: 'Zen 2' } as any;

    await controller.update('cli-1', dto);

    expect(update.execute).toHaveBeenCalledWith('cli-1', dto);
  });

  it('delete chama o caso de uso de exclusão', async () => {
    await expect(controller.delete('cli-1')).resolves.toBeUndefined();
    expect(remove.execute).toHaveBeenCalledWith('cli-1');
  });
});
