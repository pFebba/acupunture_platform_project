import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class GetServiceResponseDTO {
    @Expose()
    service_id: string;

    @Expose()
    type: string;

    static fromEntity(entity: any): GetServiceResponseDTO {
        return plainToInstance(GetServiceResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
