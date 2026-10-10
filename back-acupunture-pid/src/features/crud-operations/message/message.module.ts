import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../../../domain/entities/message.entity';
import { MessageController } from './message.controller';
import { MessageRepository } from './message-repository';
import { CreateMessageUseCase } from './create-message/create-message.use-case';
import { GetMessagesByAppointmentUseCase } from './get-message/get-messages-by-appointment.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    controllers: [MessageController],
    providers: [
        MessageRepository,
        CreateMessageUseCase,
        GetMessagesByAppointmentUseCase,
    ],
})
export class MessageModule {}
