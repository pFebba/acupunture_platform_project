import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OperatingDaysRepository } from '../operating-days-repository';
import { OperatingDaysEntity } from 'src/domain/entities/operating-days.entity';

@Injectable()
export class GetOperatingDayByClinicAndDayUseCase {
    constructor(
        @Inject(OperatingDaysRepository)
        private readonly operatingDaysRepository: OperatingDaysRepository,
    ) {}

    async execute(clinicId: string, dayOfWeek: number): Promise<OperatingDaysEntity> {
        const day = await this.operatingDaysRepository.findByClinicAndDay(clinicId, dayOfWeek);
        if (!day) {
            throw new NotFoundException('Horário de funcionamento não encontrado');
        }
        return day;
    }
}
