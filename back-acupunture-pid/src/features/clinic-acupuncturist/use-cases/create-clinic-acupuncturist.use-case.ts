import { Inject, Injectable } from '@nestjs/common';
import { IClinicAcupuncturistRepository } from '../repositories/interfaces/i-clinic-acupuncturist-repository';
import { ClinicAcupuncturistEntity } from '../clinic-acupuncturist.entity';

@Injectable()
export class CreateClinicAcupuncturistUseCase {
    constructor(
        @Inject(IClinicAcupuncturistRepository)
        private readonly clinicAcupuncturistRepository: IClinicAcupuncturistRepository,
    ) {}

    async execute(clinic_id: string, acupuncturist_id: string): Promise<ClinicAcupuncturistEntity> {
        return await this.clinicAcupuncturistRepository.create({ clinic_id, acupuncturist_id });
    }
}