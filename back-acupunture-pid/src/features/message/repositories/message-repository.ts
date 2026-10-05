import { Injectable } from "@nestjs/common";
import { IMessageRepository } from "./interfaces/i-message-repository";
import { MessageEntity } from "../message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MessageRepository implements IMessageRepository {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly typeOrmRepository: Repository<MessageEntity>,
    ) {}

    create(message: Partial<MessageEntity>): Promise<MessageEntity> {
        const newMessage = this.typeOrmRepository.create(message);
        return this.typeOrmRepository.save(newMessage);
    }
}