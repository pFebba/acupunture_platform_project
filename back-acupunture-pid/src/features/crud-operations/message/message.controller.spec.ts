import { MessageChannel } from 'src/common/domain/enums/message-channel.enum';
import { MessageController } from './message.controller';

describe('MessageController', () => {
  const entity = {
    message_id: 'msg-1',
    appointment_id: 'ap-1',
    message_text: 'Olá',
    channel: MessageChannel.OUTLOOK,
    internal: 'x',
  };
  let create: { execute: jest.Mock };
  let byAppointment: { execute: jest.Mock };
  let controller: MessageController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    byAppointment = { execute: jest.fn().mockResolvedValue([entity]) };
    controller = new MessageController(create as any, byAppointment as any);
  });

  it('create repassa o dto e mapeia a resposta', async () => {
    const dto = { appointment_id: 'ap-1', message_text: 'Olá', channel: MessageChannel.OUTLOOK };

    const result = await controller.create(dto);

    expect(create.execute).toHaveBeenCalledWith(dto);
    expect(result).not.toHaveProperty('internal');
    expect(result.message_id).toBe('msg-1');
  });

  it('getByAppointment mapeia as mensagens', async () => {
    const result = await controller.getByAppointment('ap-1');

    expect(byAppointment.execute).toHaveBeenCalledWith('ap-1');
    expect(result[0].channel).toBe(MessageChannel.OUTLOOK);
  });
});
