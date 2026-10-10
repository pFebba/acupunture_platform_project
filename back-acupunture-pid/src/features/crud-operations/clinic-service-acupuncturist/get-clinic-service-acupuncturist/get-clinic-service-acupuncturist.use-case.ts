import { Inject, Injectable } from '@nestjs/common';
import { ClinicServiceAcupuncturistRepository } from '../clinic-service-acupuncturist-repository';
import { ClinicServiceAcupuncturistEntity } from 'src/domain/entities/clinic-service-acupuncturist.entity';

@Injectable()
export class GetClinicServiceAcupuncturistUseCase {
    constructor(
        @Inject(ClinicServiceAcupuncturistRepository)
        private readonly clinicServiceAcupuncturistRepository: ClinicServiceAcupuncturistRepository,
    ) {}

    async execute(clinicId: string, acupuncturistId: string): Promise<ClinicServiceAcupuncturistEntity[]> {
        return this.clinicServiceAcupuncturistRepository.findByClinicAndAcupuncturist(clinicId, acupuncturistId);
    }
}
