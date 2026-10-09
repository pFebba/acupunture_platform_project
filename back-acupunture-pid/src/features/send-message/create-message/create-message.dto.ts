import { IsUUID, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { MessageChannel } from '../message-channel.enum';

export class CreateMessageDTO {
    @IsUUID('all', { message: 'O agendamento deve ser um UUID válido' })
    appointment_id: string;

    @IsString()
    @IsNotEmpty({ message: 'O texto da mensagem é obrigatório' })
    message_text: string;

    @IsEnum(MessageChannel, { message: 'Canal inválido' })
    channel: MessageChannel;
}