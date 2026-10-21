import { Repository } from 'typeorm';
import { BaseRepository } from './base-repository';

type Item = { id: string; name: string };

describe('BaseRepository', () => {
  let typeOrm: jest.Mocked<Pick<Repository<Item>, 'create' | 'save' | 'find' | 'findOne' | 'update' | 'delete'>>;
  let repository: BaseRepository<Item>;

  beforeEach(() => {
    typeOrm = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    repository = new BaseRepository<Item>(typeOrm as unknown as Repository<Item>);
  });

  it('create instancia a entidade e salva', async () => {
    const data = { name: 'Ana' };
    const created = { id: '1', name: 'Ana' };
    typeOrm.create.mockReturnValue(created as any);
    typeOrm.save.mockResolvedValue(created as any);

    await expect(repository.create(data)).resolves.toEqual(created);
    expect(typeOrm.create).toHaveBeenCalledWith(data);
    expect(typeOrm.save).toHaveBeenCalledWith(created);
  });

  it('findAll retorna todos os registros', async () => {
    const items = [{ id: '1', name: 'Ana' }];
    typeOrm.find.mockResolvedValue(items);

    await expect(repository.findAll()).resolves.toBe(items);
  });

  it('findById busca pelo id', async () => {
    const item = { id: '1', name: 'Ana' };
    typeOrm.findOne.mockResolvedValue(item);

    await expect(repository.findById('1')).resolves.toBe(item);
    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('update atualiza e retorna o registro recarregado', async () => {
    const item = { id: '1', name: 'Bia' };
    typeOrm.update.mockResolvedValue({} as any);
    typeOrm.findOne.mockResolvedValue(item);

    await expect(repository.update('1', { name: 'Bia' })).resolves.toBe(item);
    expect(typeOrm.update).toHaveBeenCalledWith('1', { name: 'Bia' });
    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it.each([
    [1, true],
    [0, false],
    [undefined, false],
  ])('delete com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected, raw: [] });

    await expect(repository.delete('1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith('1');
  });
});
