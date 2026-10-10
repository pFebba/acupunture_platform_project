import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { MessageEntity } from 'src/domain/entities/message.entity';

export interface IMessageRepository extends IBaseRepository<MessageEntity> {
    findByAppointment(appointmentId: string): Promise<MessageEntity[]>;
}

@Injectable()
export class MessageRepository extends BaseRepository<MessageEntity> implements IMessageRepository {
    constructor(
        @InjectRepository(MessageEntity)
        typeOrmRepository: Repository<MessageEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findById(id: string): Promise<MessageEntity | null> {
        return this.typeOrmRepository.findOne({ where: { message_id: id } as any });
    }

    async update(id: string, data: any): Promise<MessageEntity | null> {
        await this.typeOrmRepository.update({ message_id: id } as any, data);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({ message_id: id } as any);
        return (result.affected ?? 0) > 0;
    }

    async findByAppointment(appointmentId: string): Promise<MessageEntity[]> {
        return this.typeOrmRepository.find({ where: { appointment_id: appointmentId } });
    }
}
