import { Between, LessThan, MoreThanOrEqual } from 'typeorm';
import { AppointmentRepository } from './appointment-repository';

describe('AppointmentRepository', () => {
  const from = new Date('2026-11-01T00:00:00Z');
  const to = new Date('2026-11-30T00:00:00Z');
  let typeOrm: { findOne: jest.Mock; find: jest.Mock; update: jest.Mock; delete: jest.Mock; createQueryBuilder: jest.Mock };
  let repository: AppointmentRepository;

  beforeEach(() => {
    typeOrm = {
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
    };
    repository = new AppointmentRepository(typeOrm as any);
  });

  it('findById usa appointment_id', async () => {
    await repository.findById('ap-1');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { appointment_id: 'ap-1' } });
  });

  it('update usa appointment_id e recarrega o registro', async () => {
    const updated = { appointment_id: 'ap-1' };
    typeOrm.findOne.mockResolvedValue(updated);

    await expect(repository.update('ap-1', { status: 'completed' })).resolves.toBe(updated);
    expect(typeOrm.update).toHaveBeenCalledWith({ appointment_id: 'ap-1' }, { status: 'completed' });
  });

  it.each([
    [1, true],
    [0, false],
  ])('delete com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.delete('ap-1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith({ appointment_id: 'ap-1' });
  });

  describe.each([
    ['findByPatient', 'patient_id'],
    ['findByAcupuncturist', 'acupuncturist_id'],
  ])('%s', (method, column) => {
    const call = (...args: any[]) => (repository as any)[method]('id-1', ...args);
    const expectWhere = (start_datetime?: unknown) =>
      expect(typeOrm.find).toHaveBeenCalledWith({
        where: start_datetime ? { [column]: 'id-1', start_datetime } : { [column]: 'id-1' },
        order: { start_datetime: 'ASC' },
      });

    it('sem período não filtra por data', async () => {
      await call();
      expectWhere();
    });

    it('com início e fim usa Between', async () => {
      await call(from, to);
      expectWhere(Between(from, to));
    });

    it('só com início usa MoreThanOrEqual', async () => {
      await call(from);
      expectWhere(MoreThanOrEqual(from));
    });

    it('só com fim usa LessThan', async () => {
      await call(undefined, to);
      expectWhere(LessThan(to));
    });
  });

  it('findByPatientName faz join com paciente e busca parcial', async () => {
    const result = [{ appointment_id: 'ap-1' }];
    const qb = {
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(result),
    };
    typeOrm.createQueryBuilder.mockReturnValue(qb);

    await expect(repository.findByPatientName('Ana')).resolves.toBe(result);
    expect(qb.innerJoin).toHaveBeenCalledWith(expect.any(Function), 'p', 'p.id = appointment.patient_id');
    expect(qb.where).toHaveBeenCalledWith('p.name ILIKE :name', { name: '%Ana%' });
    expect(qb.orderBy).toHaveBeenCalledWith('appointment.start_datetime', 'ASC');
  });
});
