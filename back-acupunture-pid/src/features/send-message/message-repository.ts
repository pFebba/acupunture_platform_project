import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { MessageEntity } from 'src/domain/entities/message.entity';

export interface IMessageRepository extends IBaseRepository<MessageEntity> {}

@Injectable()
export class MessageRepository extends BaseRepository<MessageEntity> implements IMessageRepository {
    constructor(
        @InjectRepository(MessageEntity)
        typeOrmRepository: Repository<MessageEntity>,
    ) {
        super(typeOrmRepository);
    }
}
