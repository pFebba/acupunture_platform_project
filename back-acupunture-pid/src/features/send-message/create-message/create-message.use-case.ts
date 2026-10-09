import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from '../repositories/interfaces/i-message-repository';
import { MessageEntity } from '../message.entity';
import { CreateMessageDTO } from './create-message.dto';

@Injectable()
export class CreateMessageUseCase {
    constructor(
        @Inject(IMessageRepository)
        private readonly messageRepository: IMessageRepository,
    ) {}

    async execute(dto: CreateMessageDTO): Promise<MessageEntity> {
        return await this.messageRepository.create({
            appointment_id: dto.appointment_id,
            message_text: dto.message_text,
            channel: dto.channel,
        });
    }
}