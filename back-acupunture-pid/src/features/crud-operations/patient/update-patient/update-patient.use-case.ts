import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from '../patient-repository';
import { PatientEntity } from 'src/domain/entities/patient.entity';
import { UpdatePatientDTO } from './update-patient.dto';

@Injectable()
export class UpdatePatientUseCase {
    constructor(
        @Inject(PatientRepository)
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(id: string, dto: UpdatePatientDTO): Promise<PatientEntity> {
        const patient = await this.patientRepository.findById(id);
        if (!patient) {
            throw new NotFoundException('Paciente não encontrado');
        }

        const data: Partial<PatientEntity> = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.age_profile !== undefined) data.age_profile = dto.age_profile;
        if (dto.phone !== undefined) data.phone = dto.phone;
        if (dto.email !== undefined) data.email = dto.email;
        if (dto.profile_photo !== undefined) data.profile_photo = dto.profile_photo;

        if (Object.keys(data).length === 0) {
            return patient;
        }

        const updated = await this.patientRepository.update(id, data);
        return updated ?? patient;
    }
}
