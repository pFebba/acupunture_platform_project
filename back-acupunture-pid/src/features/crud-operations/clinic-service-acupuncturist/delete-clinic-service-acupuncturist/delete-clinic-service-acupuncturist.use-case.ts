import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClinicServiceAcupuncturistRepository } from '../clinic-service-acupuncturist-repository';

@Injectable()
export class DeleteClinicServiceAcupuncturistUseCase {
    constructor(
        @Inject(ClinicServiceAcupuncturistRepository)
        private readonly clinicServiceAcupuncturistRepository: ClinicServiceAcupuncturistRepository,
    ) {}

    async execute(clinicId: string, serviceId: string, acupuncturistId: string): Promise<void> {
        const deleted = await this.clinicServiceAcupuncturistRepository.deleteByCompositeKey(clinicId, serviceId, acupuncturistId);
        if (!deleted) {
            throw new NotFoundException('Associação clínica-serviço-acupunturista não encontrada');
        }
    }
}
