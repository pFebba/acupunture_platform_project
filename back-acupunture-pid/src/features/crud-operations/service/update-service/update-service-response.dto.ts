import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class UpdateServiceResponseDTO {
    @Expose()
    service_id: string;

    @Expose()
    type: string;

    static fromEntity(entity: any): UpdateServiceResponseDTO {
        return plainToInstance(UpdateServiceResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
