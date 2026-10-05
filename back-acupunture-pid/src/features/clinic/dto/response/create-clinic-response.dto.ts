import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class CreateClinicResponseDTO {
    @Expose()
    clinic_id: string;

    @Expose()
    name: string;

    @Expose()
    city: string;

    @Expose()
    address: string;

    static fromEntity(entity: any): CreateClinicResponseDTO {
        return plainToInstance(CreateClinicResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
