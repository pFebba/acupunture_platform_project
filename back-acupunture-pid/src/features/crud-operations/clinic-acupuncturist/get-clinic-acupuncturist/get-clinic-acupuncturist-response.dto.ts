import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class GetClinicAcupuncturistResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    acupuncturist_id: string;

    static fromEntity(entity: any): GetClinicAcupuncturistResponseDTO {
        return plainToInstance(GetClinicAcupuncturistResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
