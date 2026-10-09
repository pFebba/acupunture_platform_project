import { Inject, Injectable } from '@nestjs/common';
import { ClinicServiceAcupuncturistRepository } from '../clinic-service-acupuncturist-repository';
import { ClinicServiceAcupuncturistEntity } from '../clinic-service-acupuncturist.entity';
import { CreateClinicServiceAcupuncturistDTO } from './create-clinic-service-acupuncturist.dto';

@Injectable()
export class CreateClinicServiceAcupuncturistUseCase {
    constructor(
        @Inject(ClinicServiceAcupuncturistRepository)
        private readonly clinicServiceAcupuncturistRepository: ClinicServiceAcupuncturistRepository,
    ) {}

    async execute(dto: CreateClinicServiceAcupuncturistDTO): Promise<ClinicServiceAcupuncturistEntity> {
        return await this.clinicServiceAcupuncturistRepository.create({
            clinic_id: dto.clinic_id,
            service_id: dto.service_id,
            acupuncturist_id: dto.acupuncturist_id,
            price: dto.price,
        });
    }
}