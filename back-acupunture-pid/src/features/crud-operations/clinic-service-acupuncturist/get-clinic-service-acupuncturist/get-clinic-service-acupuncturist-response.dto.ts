import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class GetClinicServiceAcupuncturistResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    service_id: string;

    @Expose()
    acupuncturist_id: string;

    @Expose()
    price: number;

    static fromEntity(entity: any): GetClinicServiceAcupuncturistResponseDTO {
        return plainToInstance(GetClinicServiceAcupuncturistResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
