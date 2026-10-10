import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from '../patient-repository';
import { PatientEntity } from 'src/domain/entities/patient.entity';

@Injectable()
export class ListPatientsUseCase {
    constructor(
        @Inject(PatientRepository)
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(): Promise<PatientEntity[]> {
        return this.patientRepository.findAll();
    }
}
