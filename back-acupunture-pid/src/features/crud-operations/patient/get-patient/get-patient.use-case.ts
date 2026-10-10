import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from '../patient-repository';
import { PatientEntity } from 'src/domain/entities/patient.entity';

@Injectable()
export class GetPatientUseCase {
    constructor(
        @Inject(PatientRepository)
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(id: string): Promise<PatientEntity> {
        const patient = await this.patientRepository.findById(id);
        if (!patient) {
            throw new NotFoundException('Paciente não encontrado');
        }
        return patient;
    }
}
