import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class UpdatePatientResponseDTO {
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

    static fromEntity(entity: any): UpdatePatientResponseDTO {
        return plainToInstance(UpdatePatientResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
