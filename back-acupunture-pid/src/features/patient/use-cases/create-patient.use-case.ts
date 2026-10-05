import { Inject, Injectable } from '@nestjs/common';
import { IPatientRepository } from '../repositories/interfaces/i-patient-repository';
import { PatientEntity } from '../patient.entity';

@Injectable()
export class CreatePatientUseCase {
    constructor(
        @Inject(IPatientRepository)
        private readonly patientRepository: IPatientRepository,
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
