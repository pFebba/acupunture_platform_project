import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from '../patient-repository';
import { PatientEntity } from 'src/domain/entities/patient.entity';

@Injectable()
export class CreatePatientUseCase {
    constructor(
        @Inject(PatientRepository)
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(
        name: string,
        phone: string,
        age_profile?: string,
        email?: string,
        profile_photo?: string,
    ): Promise<PatientEntity> {
        return await this.patientRepository.create({
            name,
            phone,
            age_profile,
            email,
            profile_photo,
        });
    }
}
