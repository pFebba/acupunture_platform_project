import { ClinicRepository } from './clinic-repository';

describe('ClinicRepository', () => {
  let typeOrm: { findOne: jest.Mock; update: jest.Mock; delete: jest.Mock };
  let repository: ClinicRepository;

  beforeEach(() => {
    typeOrm = { findOne: jest.fn(), update: jest.fn(), delete: jest.fn() };
    repository = new ClinicRepository(typeOrm as any);
  });

  it('findById usa clinic_id', async () => {
    await repository.findById('cli-1');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { clinic_id: 'cli-1' } });
  });

  it('update usa clinic_id e recarrega o registro', async () => {
    const updated = { clinic_id: 'cli-1' };
    typeOrm.findOne.mockResolvedValue(updated);

    await expect(repository.update('cli-1', { name: 'Zen' })).resolves.toBe(updated);
    expect(typeOrm.update).toHaveBeenCalledWith({ clinic_id: 'cli-1' }, { name: 'Zen' });
  });

  it.each([
    [1, true],
    [0, false],
    [null, false],
  ])('delete com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.delete('cli-1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith({ clinic_id: 'cli-1' });
  });
});
