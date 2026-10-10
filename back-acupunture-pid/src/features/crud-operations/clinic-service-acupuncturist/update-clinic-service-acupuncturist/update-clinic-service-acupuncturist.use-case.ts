import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClinicServiceAcupuncturistRepository } from '../clinic-service-acupuncturist-repository';
import { ClinicServiceAcupuncturistEntity } from 'src/domain/entities/clinic-service-acupuncturist.entity';
import { UpdateClinicServiceAcupuncturistDTO } from './update-clinic-service-acupuncturist.dto';

@Injectable()
export class UpdateClinicServiceAcupuncturistUseCase {
    constructor(
        @Inject(ClinicServiceAcupuncturistRepository)
        private readonly clinicServiceAcupuncturistRepository: ClinicServiceAcupuncturistRepository,
    ) {}

    async execute(
        clinicId: string,
        serviceId: string,
        acupuncturistId: string,
        dto: UpdateClinicServiceAcupuncturistDTO,
    ): Promise<ClinicServiceAcupuncturistEntity> {
        const existing = await this.clinicServiceAcupuncturistRepository.findByClinicAndAcupuncturist(clinicId, acupuncturistId);
        const record = existing.find(e => e.service_id === serviceId);
        if (!record) {
            throw new NotFoundException('Associação clínica-serviço-acupunturista não encontrada');
        }

        const updated = await this.clinicServiceAcupuncturistRepository.updatePrice(clinicId, serviceId, acupuncturistId, dto.price);
        return updated ?? record;
    }
}
