import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class GetPatientResponseDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    age_profile?: string;

    @Expose()
    phone: string;

    @Expose()
    email?: string;

    @Expose()
    profile_photo?: string;

    static fromEntity(entity: any): GetPatientResponseDTO {
        return plainToInstance(GetPatientResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
