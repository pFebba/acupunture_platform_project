import { ClinicServiceAcupuncturistRepository } from './clinic-service-acupuncturist-repository';

describe('ClinicServiceAcupuncturistRepository', () => {
  const key = { clinic_id: 'cli-1', service_id: 'srv-1', acupuncturist_id: 'acu-1' };
  let typeOrm: { find: jest.Mock; findOne: jest.Mock; update: jest.Mock; delete: jest.Mock };
  let repository: ClinicServiceAcupuncturistRepository;

  beforeEach(() => {
    typeOrm = { find: jest.fn(), findOne: jest.fn(), update: jest.fn(), delete: jest.fn() };
    repository = new ClinicServiceAcupuncturistRepository(typeOrm as any);
  });

  it('findByClinicAndAcupuncturist filtra pelos dois ids', async () => {
    await repository.findByClinicAndAcupuncturist('cli-1', 'acu-1');

    expect(typeOrm.find).toHaveBeenCalledWith({ where: { clinic_id: 'cli-1', acupuncturist_id: 'acu-1' } });
  });

  it('updatePrice atualiza pela chave composta e recarrega', async () => {
    const updated = { ...key, price: 200 };
    typeOrm.findOne.mockResolvedValue(updated);

    await expect(repository.updatePrice('cli-1', 'srv-1', 'acu-1', 200)).resolves.toBe(updated);
    expect(typeOrm.update).toHaveBeenCalledWith(key, { price: 200 });
    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: key });
  });

  it('updatePrice retorna null quando o registro não existe', async () => {
    typeOrm.findOne.mockResolvedValue(undefined);

    await expect(repository.updatePrice('cli-1', 'srv-1', 'acu-1', 200)).resolves.toBeNull();
  });

  it.each([
    [1, true],
    [0, false],
  ])('deleteByCompositeKey com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.deleteByCompositeKey('cli-1', 'srv-1', 'acu-1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith(key);
  });
});
