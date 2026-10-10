import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class UpdateClinicResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    name: string;

    @Expose()
    logo?: string;

    @Expose()
    city: string;

    @Expose()
    zip_code: string;

    @Expose()
    address: string;

    static fromEntity(entity: any): UpdateClinicResponseDTO {
        return plainToInstance(UpdateClinicResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
