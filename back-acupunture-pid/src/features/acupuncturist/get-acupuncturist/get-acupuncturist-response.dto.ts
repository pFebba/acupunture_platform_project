import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class GetAcupuncturistResponseDto {
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
    created_at: Date;

    @Expose()
    updated_at: Date;

    static fromEntity(entity: any): GetAcupuncturistResponseDto {
        return plainToInstance(GetAcupuncturistResponseDto, entity, {
            excludeExtraneousValues: true,
        });
    }
}
