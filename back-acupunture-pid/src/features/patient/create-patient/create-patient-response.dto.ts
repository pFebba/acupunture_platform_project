import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class CreatePatientResponseDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    phone: string;

    @Expose()
    email?: string;

    static fromEntity(entity: any): CreatePatientResponseDTO {
        return plainToInstance(CreatePatientResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
