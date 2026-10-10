import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class GetOperatingDaysResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    day_of_week: number;

    @Expose()
    is_open: boolean;

    @Expose()
    opening_time?: string;

    @Expose()
    closing_time?: string;

    static fromEntity(entity: any): GetOperatingDaysResponseDTO {
        return plainToInstance(GetOperatingDaysResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
