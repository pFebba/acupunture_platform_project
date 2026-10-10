import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class ListAcupuncturistsItemResponseDto {
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

    static fromEntity(entity: any): ListAcupuncturistsItemResponseDto {
        return plainToInstance(ListAcupuncturistsItemResponseDto, entity, {
            excludeExtraneousValues: true,
        });
    }
}

export class ListAcupuncturistsResponseDto {
    data: ListAcupuncturistsItemResponseDto[];
    total: number;

    static fromEntities(entities: any[]): ListAcupuncturistsResponseDto {
        const response = new ListAcupuncturistsResponseDto();
        response.data = entities.map(entity => ListAcupuncturistsItemResponseDto.fromEntity(entity));
        response.total = entities.length;
        return response;
    }
}
