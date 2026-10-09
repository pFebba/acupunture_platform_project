import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MessageChannel } from "./message-channel.enum";

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    message_id: string;

    @Column({ type: 'uuid', nullable: false, unique: true })
    appointment_id: string;

    @Column({ type: 'text', nullable: false })
    message_text: string;

    @Column({
        type: 'enum',
        enum: MessageChannel,
        enumName: 'message_channel',
        nullable: false,
    })
    channel: MessageChannel;
}