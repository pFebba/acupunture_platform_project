import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class UpdateClinicServiceAcupuncturistResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    service_id: string;

    @Expose()
    acupuncturist_id: string;

    @Expose()
    price: number;

    static fromEntity(entity: any): UpdateClinicServiceAcupuncturistResponseDTO {
        return plainToInstance(UpdateClinicServiceAcupuncturistResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
