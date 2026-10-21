import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { MessageChannel } from 'src/common/domain/enums/message-channel.enum';
import { CreateMessageUseCase } from './create-message/create-message.use-case';
import { CreateMessageDTO } from './create-message/create-message.dto';
import { GetMessagesByAppointmentUseCase } from './get-message/get-messages-by-appointment.use-case';

describe('Message use cases', () => {
  const message = {
    message_id: 'msg-1',
    appointment_id: 'ap-1',
    message_text: 'Lembrete da sessão',
    channel: MessageChannel.WHATSAPP,
  };

  it('CreateMessageUseCase cria a mensagem', async () => {
    const repository = { create: jest.fn().mockResolvedValue(message) };
    const dto = { appointment_id: 'ap-1', message_text: 'Lembrete da sessão', channel: MessageChannel.WHATSAPP };

    await expect(new CreateMessageUseCase(repository as any).execute(dto)).resolves.toBe(message);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('GetMessagesByAppointmentUseCase busca pelo agendamento', async () => {
    const repository = { findByAppointment: jest.fn().mockResolvedValue([message]) };

    await expect(new GetMessagesByAppointmentUseCase(repository as any).execute('ap-1')).resolves.toEqual([message]);
    expect(repository.findByAppointment).toHaveBeenCalledWith('ap-1');
  });
});

describe('CreateMessageDTO', () => {
  const payload = {
    appointment_id: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
    message_text: 'Olá',
    channel: 'TELEGRAM',
  };
  const invalidProperties = (override: object) =>
    validateSync(plainToInstance(CreateMessageDTO, { ...payload, ...override })).map((e) => e.property);

  it('aceita um payload válido', () => {
    expect(invalidProperties({})).toEqual([]);
  });

  it.each([
    ['appointment_id', { appointment_id: 'abc' }],
    ['message_text', { message_text: '' }],
    ['channel', { channel: 'SMS' }],
  ])('rejeita %s inválido', (property, override) => {
    expect(invalidProperties(override)).toEqual([property]);
  });
});
