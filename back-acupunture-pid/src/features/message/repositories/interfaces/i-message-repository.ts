import { MessageEntity } from "../../message.entity";

export interface IMessageRepository {
    create(message: Partial<MessageEntity>): Promise<MessageEntity>;
}

export const IMessageRepository = Symbol('IMessageRepository');