import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from '../patient-repository';

@Injectable()
export class DeletePatientUseCase {
    constructor(
        @Inject(PatientRepository)
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const deleted = await this.patientRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException('Paciente não encontrado');
        }
    }
}
