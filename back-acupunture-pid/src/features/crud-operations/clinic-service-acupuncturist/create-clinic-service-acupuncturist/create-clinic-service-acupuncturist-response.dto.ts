import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class CreateClinicServiceAcupuncturistResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    service_id: string;

    @Expose()
    acupuncturist_id: string;

    @Expose()
    price: number;

    static fromEntity(entity: any): CreateClinicServiceAcupuncturistResponseDTO {
        return plainToInstance(CreateClinicServiceAcupuncturistResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}