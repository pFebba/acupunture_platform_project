import { Inject, Injectable } from '@nestjs/common';
import { IClinicServiceAcupuncturistRepository } from '../repositories/interfaces/i-clinic-service-acupuncturist-repository';
import { ClinicServiceAcupuncturistEntity } from '../clinic-service-acupuncturist.entity';
import { CreateClinicServiceAcupuncturistDTO } from './create-clinic-service-acupuncturist.dto';

@Injectable()
export class CreateClinicServiceAcupuncturistUseCase {
    constructor(
        @Inject(IClinicServiceAcupuncturistRepository)
        private readonly clinicServiceAcupuncturistRepository: IClinicServiceAcupuncturistRepository,
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