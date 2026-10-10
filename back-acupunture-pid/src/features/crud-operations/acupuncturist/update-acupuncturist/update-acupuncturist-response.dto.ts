import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class UpdateAcupuncturistResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    cpf: string;

    @Expose()
    phone?: string;

    @Expose()
    updated_at: Date;

    static fromEntity(entity: any): UpdateAcupuncturistResponseDto {
        return plainToInstance(UpdateAcupuncturistResponseDto, entity, {
            excludeExtraneousValues: true,
        });
    }
}
