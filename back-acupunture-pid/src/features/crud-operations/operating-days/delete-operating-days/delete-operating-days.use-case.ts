import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OperatingDaysRepository } from '../operating-days-repository';

@Injectable()
export class DeleteOperatingDaysUseCase {
    constructor(
        @Inject(OperatingDaysRepository)
        private readonly operatingDaysRepository: OperatingDaysRepository,
    ) {}

    async execute(clinicId: string, dayOfWeek: number): Promise<void> {
        const deleted = await this.operatingDaysRepository.deleteByClinicAndDay(clinicId, dayOfWeek);
        if (!deleted) {
            throw new NotFoundException('Horário de funcionamento não encontrado');
        }
    }
}
