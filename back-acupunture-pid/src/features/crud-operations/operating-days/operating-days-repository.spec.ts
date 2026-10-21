import { OperatingDaysRepository } from './operating-days-repository';

describe('OperatingDaysRepository', () => {
  let typeOrm: { find: jest.Mock; findOne: jest.Mock; update: jest.Mock; delete: jest.Mock };
  let repository: OperatingDaysRepository;

  beforeEach(() => {
    typeOrm = { find: jest.fn(), findOne: jest.fn(), update: jest.fn(), delete: jest.fn() };
    repository = new OperatingDaysRepository(typeOrm as any);
  });

  it('findByClinic ordena pelo dia da semana', async () => {
    await repository.findByClinic('cli-1');

    expect(typeOrm.find).toHaveBeenCalledWith({ where: { clinic_id: 'cli-1' }, order: { day_of_week: 'ASC' } });
  });

  it('findByClinicAndDay filtra por clínica e dia', async () => {
    await repository.findByClinicAndDay('cli-1', 3);

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { clinic_id: 'cli-1', day_of_week: 3 } });
  });

  it('updateByClinicAndDay atualiza e recarrega o registro', async () => {
    const updated = { clinic_id: 'cli-1', day_of_week: 3 };
    typeOrm.findOne.mockResolvedValue(updated);

    await expect(repository.updateByClinicAndDay('cli-1', 3, { is_open: false })).resolves.toBe(updated);
    expect(typeOrm.update).toHaveBeenCalledWith({ clinic_id: 'cli-1', day_of_week: 3 }, { is_open: false });
  });

  it.each([
    [1, true],
    [0, false],
  ])('deleteByClinicAndDay com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.deleteByClinicAndDay('cli-1', 3)).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith({ clinic_id: 'cli-1', day_of_week: 3 });
  });
});
