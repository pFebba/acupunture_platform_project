import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from '../message-repository';
import { MessageEntity } from 'src/domain/entities/message.entity';

@Injectable()
export class GetMessagesByAppointmentUseCase {
    constructor(
        @Inject(MessageRepository)
        private readonly messageRepository: MessageRepository,
    ) {}

    async execute(appointmentId: string): Promise<MessageEntity[]> {
        return this.messageRepository.findByAppointment(appointmentId);
    }
}
