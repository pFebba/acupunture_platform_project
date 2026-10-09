import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class CreateServiceResponseDTO {
    @Expose()
    service_id: string;

    @Expose()
    type: string;

    static fromEntity(entity: any): CreateServiceResponseDTO {
        return plainToInstance(CreateServiceResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
