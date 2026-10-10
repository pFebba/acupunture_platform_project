import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClinicAcupuncturistRepository } from '../clinic-acupuncturist-repository';

@Injectable()
export class DeleteClinicAcupuncturistUseCase {
    constructor(
        @Inject(ClinicAcupuncturistRepository)
        private readonly clinicAcupuncturistRepository: ClinicAcupuncturistRepository,
    ) {}

    async execute(clinicId: string, acupuncturistId: string): Promise<void> {
        const deleted = await this.clinicAcupuncturistRepository.deleteByCompositeKey(clinicId, acupuncturistId);
        if (!deleted) {
            throw new NotFoundException('Associação clínica-acupunturista não encontrada');
        }
    }
}
