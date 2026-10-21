import { ServiceRepository } from './service-repository';

describe('ServiceRepository', () => {
  let typeOrm: { findOne: jest.Mock; update: jest.Mock; delete: jest.Mock };
  let repository: ServiceRepository;

  beforeEach(() => {
    typeOrm = { findOne: jest.fn(), update: jest.fn(), delete: jest.fn() };
    repository = new ServiceRepository(typeOrm as any);
  });

  it('findById usa service_id', async () => {
    await repository.findById('srv-1');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { service_id: 'srv-1' } });
  });

  it('findByType filtra pelo tipo', async () => {
    await repository.findByType('Acupuntura');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { type: 'Acupuntura' } });
  });

  it('update usa service_id e recarrega o registro', async () => {
    const updated = { service_id: 'srv-1', type: 'Ventosa' };
    typeOrm.findOne.mockResolvedValue(updated);

    await expect(repository.update('srv-1', { type: 'Ventosa' })).resolves.toBe(updated);
    expect(typeOrm.update).toHaveBeenCalledWith({ service_id: 'srv-1' }, { type: 'Ventosa' });
  });

  it.each([
    [1, true],
    [0, false],
  ])('delete com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.delete('srv-1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith({ service_id: 'srv-1' });
  });
});
