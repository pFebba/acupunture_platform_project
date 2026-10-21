import { PatientController } from './patient.controller';

describe('PatientController', () => {
  const entity = {
    id: 'pat-1',
    name: 'Carlos',
    age_profile: 'adulto',
    phone: '11999999999',
    email: 'c@mail.com',
    profile_photo: 'foto.png',
    internal: 'x',
  };
  let create: { execute: jest.Mock };
  let get: { execute: jest.Mock };
  let list: { execute: jest.Mock };
  let update: { execute: jest.Mock };
  let remove: { execute: jest.Mock };
  let controller: PatientController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    get = { execute: jest.fn().mockResolvedValue(entity) };
    list = { execute: jest.fn().mockResolvedValue([entity]) };
    update = { execute: jest.fn().mockResolvedValue(entity) };
    remove = { execute: jest.fn() };
    controller = new PatientController(create as any, get as any, list as any, update as any, remove as any);
  });

  it('create desmonta o dto nos parâmetros do caso de uso', async () => {
    const result = await controller.create({
      name: 'Carlos',
      phone: '11999999999',
      age_profile: 'adulto',
      email: 'c@mail.com',
      profile_photo: 'foto.png',
    } as any);

    expect(create.execute).toHaveBeenCalledWith('Carlos', '11999999999', 'adulto', 'c@mail.com', 'foto.png');
    expect({ ...result }).toEqual({ id: 'pat-1', name: 'Carlos', phone: '11999999999', email: 'c@mail.com' });
  });

  it('list mapeia os pacientes', async () => {
    const [result] = await controller.list();

    expect(result).not.toHaveProperty('internal');
    expect(result.profile_photo).toBe('foto.png');
  });

  it('getById busca pelo id', async () => {
    await controller.getById('pat-1');

    expect(get.execute).toHaveBeenCalledWith('pat-1');
  });

  it('update repassa id e dto', async () => {
    const dto = { name: 'Carlos Silva' } as any;

    await controller.update('pat-1', dto);

    expect(update.execute).toHaveBeenCalledWith('pat-1', dto);
  });

  it('delete chama o caso de uso de exclusão', async () => {
    await controller.delete('pat-1');

    expect(remove.execute).toHaveBeenCalledWith('pat-1');
  });
});
