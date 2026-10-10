import { Inject, Injectable } from '@nestjs/common';
import { OperatingDaysRepository } from '../operating-days-repository';
import { OperatingDaysEntity } from 'src/domain/entities/operating-days.entity';

@Injectable()
export class GetOperatingDaysByClinicUseCase {
    constructor(
        @Inject(OperatingDaysRepository)
        private readonly operatingDaysRepository: OperatingDaysRepository,
    ) {}

    async execute(clinicId: string): Promise<OperatingDaysEntity[]> {
        return this.operatingDaysRepository.findByClinic(clinicId);
    }
}
