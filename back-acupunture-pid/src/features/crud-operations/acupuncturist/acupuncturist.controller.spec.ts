import { BadRequestException } from '@nestjs/common';
import { AcupuncturistController } from './acupuncturist.controller';

describe('AcupuncturistController', () => {
  const entity = {
    id: 'a1',
    name: 'Ana',
    email: 'ana@mail.com',
    emailVerified: true,
    cpf: '52998224725',
    phone: '11999999999',
    password_hash: 'hash',
  };
  const useCase = () => ({ execute: jest.fn() });
  let useCases: Record<string, { execute: jest.Mock }>;
  let controller: AcupuncturistController;

  beforeEach(() => {
    useCases = {
      create: useCase(),
      list: useCase(),
      get: useCase(),
      getByCpf: useCase(),
      getByEmail: useCase(),
      getByEmailWithPassword: useCase(),
      searchByName: useCase(),
      update: useCase(),
      delete: useCase(),
    };
    controller = new AcupuncturistController(
      useCases.create as any,
      useCases.list as any,
      useCases.get as any,
      useCases.getByCpf as any,
      useCases.getByEmail as any,
      useCases.getByEmailWithPassword as any,
      useCases.searchByName as any,
      useCases.update as any,
      useCases.delete as any,
    );
  });

  it('create devolve a resposta sem dados sensíveis', async () => {
    useCases.create.execute.mockResolvedValue(entity);
    const dto = { name: 'Ana', cpf: entity.cpf, email: entity.email, emailVerified: true, password: '123456' };

    const result = await controller.create(dto);

    expect(useCases.create.execute).toHaveBeenCalledWith(dto);
    expect({ ...result }).toEqual({ id: 'a1', name: 'Ana', email: 'ana@mail.com', emailVerified: true });
  });

  it('list mapeia todas as entidades', async () => {
    useCases.list.execute.mockResolvedValue([entity, { ...entity, id: 'a2' }]);

    const result = await controller.list();

    expect(result.map((r) => r.id)).toEqual(['a1', 'a2']);
    expect(result[0]).not.toHaveProperty('password_hash');
  });

  it('searchByName repassa o nome', async () => {
    useCases.searchByName.execute.mockResolvedValue([entity]);

    await expect(controller.searchByName('Ana')).resolves.toHaveLength(1);
    expect(useCases.searchByName.execute).toHaveBeenCalledWith('Ana');
  });

  it.each([undefined, '', '   '])('searchByName rejeita nome vazio (%p)', async (name) => {
    await expect(controller.searchByName(name as any)).rejects.toBeInstanceOf(BadRequestException);
    expect(useCases.searchByName.execute).not.toHaveBeenCalled();
  });

  it.each([
    ['getByCpf', 'getByCpf', entity.cpf],
    ['getByEmail', 'getByEmail', entity.email],
    ['getById', 'get', entity.id],
  ])('%s busca e mapeia a entidade', async (method, useCaseKey, arg) => {
    useCases[useCaseKey].execute.mockResolvedValue(entity);

    const result = await (controller as any)[method](arg);

    expect(useCases[useCaseKey].execute).toHaveBeenCalledWith(arg);
    expect(result.id).toBe('a1');
    expect(result).not.toHaveProperty('password_hash');
  });

  it('getByEmailWithPassword não expõe o hash da senha', async () => {
    useCases.getByEmailWithPassword.execute.mockResolvedValue(entity);

    const result = await controller.getByEmailWithPassword(entity.email);

    expect(useCases.getByEmailWithPassword.execute).toHaveBeenCalledWith(entity.email);
    expect(result).not.toHaveProperty('password_hash');
  });

  it('getByEmailWithPassword rejeita e-mail vazio', async () => {
    await expect(controller.getByEmailWithPassword(' ')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('update repassa id e dto', async () => {
    useCases.update.execute.mockResolvedValue({ ...entity, name: 'Ana Maria' });

    const result = await controller.update('a1', { name: 'Ana Maria' });

    expect(useCases.update.execute).toHaveBeenCalledWith('a1', { name: 'Ana Maria' });
    expect(result.name).toBe('Ana Maria');
    expect(result).not.toHaveProperty('password_hash');
  });

  it('remove chama o caso de uso de exclusão', async () => {
    useCases.delete.execute.mockResolvedValue(undefined);

    await expect(controller.remove('a1')).resolves.toBeUndefined();
    expect(useCases.delete.execute).toHaveBeenCalledWith('a1');
  });
});
