import { MessageRepository } from './message-repository';

describe('MessageRepository', () => {
  let typeOrm: { find: jest.Mock; findOne: jest.Mock; update: jest.Mock; delete: jest.Mock };
  let repository: MessageRepository;

  beforeEach(() => {
    typeOrm = { find: jest.fn(), findOne: jest.fn(), update: jest.fn(), delete: jest.fn() };
    repository = new MessageRepository(typeOrm as any);
  });

  it('findById usa message_id', async () => {
    await repository.findById('msg-1');

    expect(typeOrm.findOne).toHaveBeenCalledWith({ where: { message_id: 'msg-1' } });
  });

  it('update usa message_id e recarrega o registro', async () => {
    const updated = { message_id: 'msg-1' };
    typeOrm.findOne.mockResolvedValue(updated);

    await expect(repository.update('msg-1', { message_text: 'Oi' })).resolves.toBe(updated);
    expect(typeOrm.update).toHaveBeenCalledWith({ message_id: 'msg-1' }, { message_text: 'Oi' });
  });

  it.each([
    [1, true],
    [0, false],
  ])('delete com affected=%p retorna %p', async (affected, expected) => {
    typeOrm.delete.mockResolvedValue({ affected });

    await expect(repository.delete('msg-1')).resolves.toBe(expected);
    expect(typeOrm.delete).toHaveBeenCalledWith({ message_id: 'msg-1' });
  });

  it('findByAppointment filtra por appointment_id', async () => {
    await repository.findByAppointment('ap-1');

    expect(typeOrm.find).toHaveBeenCalledWith({ where: { appointment_id: 'ap-1' } });
  });
});
