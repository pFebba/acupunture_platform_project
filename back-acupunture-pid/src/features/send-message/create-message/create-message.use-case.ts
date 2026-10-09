import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from '../message-repository';
import { MessageEntity } from '../message.entity';
import { CreateMessageDTO } from './create-message.dto';

@Injectable()
export class CreateMessageUseCase {
    constructor(
        @Inject(MessageRepository)
        private readonly messageRepository: MessageRepository,
    ) {}

    async execute(dto: CreateMessageDTO): Promise<MessageEntity> {
        return await this.messageRepository.create({
            appointment_id: dto.appointment_id,
            message_text: dto.message_text,
            channel: dto.channel,
        });
    }
}