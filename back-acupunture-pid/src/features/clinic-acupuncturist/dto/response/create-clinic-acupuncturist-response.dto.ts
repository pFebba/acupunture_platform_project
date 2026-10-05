import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class CreateClinicAcupuncturistResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    acupuncturist_id: string;

    static fromEntity(entity: any): CreateClinicAcupuncturistResponseDTO {
        return plainToInstance(CreateClinicAcupuncturistResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}