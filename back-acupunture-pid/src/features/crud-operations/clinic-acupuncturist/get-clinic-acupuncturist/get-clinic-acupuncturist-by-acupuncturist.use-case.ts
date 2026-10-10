import { Inject, Injectable } from '@nestjs/common';
import { ClinicAcupuncturistRepository } from '../clinic-acupuncturist-repository';
import { ClinicAcupuncturistEntity } from 'src/domain/entities/clinic-acupuncturist.entity';

@Injectable()
export class GetClinicAcupuncturistByAcupuncturistUseCase {
    constructor(
        @Inject(ClinicAcupuncturistRepository)
        private readonly clinicAcupuncturistRepository: ClinicAcupuncturistRepository,
    ) {}

    async execute(acupuncturistId: string): Promise<ClinicAcupuncturistEntity[]> {
        return this.clinicAcupuncturistRepository.findByAcupuncturist(acupuncturistId);
    }
}
