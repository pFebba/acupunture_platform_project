import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class DeleteAcupuncturistResponseDto {
    @Expose()
    message: string;

    @Expose()
    success: boolean;

    static create(message: string, success: boolean = true): DeleteAcupuncturistResponseDto {
        const instance = new DeleteAcupuncturistResponseDto();
        instance.message = message;
        instance.success = success;
        return plainToInstance(DeleteAcupuncturistResponseDto, instance, {
            excludeExtraneousValues: true,
        });
    }
}
