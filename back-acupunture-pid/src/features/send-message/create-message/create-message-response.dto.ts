import { Exclude, Expose, plainToInstance } from "class-transformer";
import { MessageChannel } from "../message-channel.enum";

@Exclude()
export class CreateMessageResponseDTO {
    @Expose()
    message_id: string;

    @Expose()
    appointment_id: string;

    @Expose()
    message_text: string;

    @Expose()
    channel: MessageChannel;

    static fromEntity(entity: any): CreateMessageResponseDTO {
        return plainToInstance(CreateMessageResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}