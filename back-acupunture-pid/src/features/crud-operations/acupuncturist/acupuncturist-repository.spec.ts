import { ILike } from 'typeorm';
import { AcupuncturistRepository } from './acupuncturist-repository';

describe('AcupuncturistRepository', () => {
  let typeOrm: { findOne: jest.Mock; find: jest.Mock; createQueryBuilder: jest.Mock };
  let repository: AcupuncturistRepository;

  beforeEach(() => {
    typeOrm = { findOne: jest.fn(), find: jest.fn(), createQueryBuilder: jest.fn() };
    repository = new AcupuncturistRepository(typeOrm as any);
  });

  it('findByCpf filtra pelo cpf', async () => {
    await repository.findByCpf('52998224725');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { cpf: '52998224725' } });
  });

  it('findByEmail filtra pelo e-mail', async () => {
    await repository.findByEmail('ana@mail.com');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { email: 'ana@mail.com' } });
  });

  it('findByName faz busca parcial sem diferenciar maiúsculas', async () => {
    await repository.findByName('ana');

    expect(typeOrm.find).toHaveBeenCalledWith({ where: { name: ILike('%ana%') } });
  });

  it('findCredentials inclui o hash da senha na consulta', async () => {
    const result = { id: 'a1', password_hash: 'hash' };
    const qb = {
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(result),
    };
    typeOrm.createQueryBuilder.mockReturnValue(qb);

    await expect(repository.findCredentials('ana@mail.com')).resolves.toBe(result);
    expect(typeOrm.createQueryBuilder).toHaveBeenCalledWith('a');
    expect(qb.addSelect).toHaveBeenCalledWith('a.password_hash');
    expect(qb.where).toHaveBeenCalledWith('a.email = :email', { email: 'ana@mail.com' });
  });
});
