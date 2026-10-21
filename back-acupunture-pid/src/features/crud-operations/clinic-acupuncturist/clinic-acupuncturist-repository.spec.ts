import { ClinicAcupuncturistRepository } from './clinic-acupuncturist-repository';

describe('ClinicAcupuncturistRepository', () => {
  let typeOrm: { find: jest.Mock; delete: jest.Mock };
  let repository: ClinicAcupuncturistRepository;

  beforeEach(() => {
    typeOrm = { find: jest.fn(), delete: jest.fn() };
    repository = new ClinicAcupuncturistRepository(typeOrm as any);
  });

  it('findByClinic filtra por clinic_id', async () => {
    await repository.findByClinic('cli-1');

    expect(typeOrm.find).toHaveBeenCalledWith({ where: { clinic_id: 'cli-1' } });
  });

  it('findByAcupuncturist filtra por acupuncturist_id', async () => {
    await repository.findByAcupuncturist('acu-1');

    expect(typeOrm.find).toHaveBeenCalledWith({ where: { acupuncturist_id: 'acu-1' } });
  });

  it.each([
    [1, true],
    [0, false],
  ])('deleteByCompositeKey com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.deleteByCompositeKey('cli-1', 'acu-1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith({ clinic_id: 'cli-1', acupuncturist_id: 'acu-1' });
  });
});
