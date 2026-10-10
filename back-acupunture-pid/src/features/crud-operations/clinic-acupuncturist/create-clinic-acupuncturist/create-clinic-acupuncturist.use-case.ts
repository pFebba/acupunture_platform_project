import { Inject, Injectable } from '@nestjs/common';
import { ClinicAcupuncturistRepository } from '../clinic-acupuncturist-repository';
import { ClinicAcupuncturistEntity } from 'src/domain/entities/clinic-acupuncturist.entity';

@Injectable()
export class CreateClinicAcupuncturistUseCase {
    constructor(
        @Inject(ClinicAcupuncturistRepository)
        private readonly clinicAcupuncturistRepository: ClinicAcupuncturistRepository,
    ) {}

    async execute(clinic_id: string, acupuncturist_id: string): Promise<ClinicAcupuncturistEntity> {
        return await this.clinicAcupuncturistRepository.create({ clinic_id, acupuncturist_id });
    }
}