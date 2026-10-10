import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class UpdateOperatingDaysResponseDTO {
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

    static fromEntity(entity: any): UpdateOperatingDaysResponseDTO {
        return plainToInstance(UpdateOperatingDaysResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
