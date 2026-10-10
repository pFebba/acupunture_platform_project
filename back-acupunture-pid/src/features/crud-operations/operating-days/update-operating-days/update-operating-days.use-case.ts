import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OperatingDaysRepository } from '../operating-days-repository';
import { OperatingDaysEntity } from 'src/domain/entities/operating-days.entity';
import { UpdateOperatingDaysDTO } from './update-operating-days.dto';

@Injectable()
export class UpdateOperatingDaysUseCase {
    constructor(
        @Inject(OperatingDaysRepository)
        private readonly operatingDaysRepository: OperatingDaysRepository,
    ) {}

    async execute(clinicId: string, dayOfWeek: number, dto: UpdateOperatingDaysDTO): Promise<OperatingDaysEntity> {
        const existing = await this.operatingDaysRepository.findByClinicAndDay(clinicId, dayOfWeek);
        if (!existing) {
            throw new NotFoundException('Horário de funcionamento não encontrado');
        }

        const isOpen = dto.is_open ?? existing.is_open;
        const openingTime = dto.opening_time ?? existing.opening_time;
        const closingTime = dto.closing_time ?? existing.closing_time;

        if (isOpen) {
            if (!openingTime || !closingTime) {
                throw new BadRequestException('Horários de abertura e fechamento são obrigatórios para dias abertos');
            }
            if (closingTime <= openingTime) {
                throw new BadRequestException('O horário de fechamento deve ser posterior ao de abertura');
            }
        }

        const data: Partial<OperatingDaysEntity> = {};
        if (dto.is_open !== undefined) data.is_open = dto.is_open;
        if (dto.opening_time !== undefined) data.opening_time = dto.opening_time;
        if (dto.closing_time !== undefined) data.closing_time = dto.closing_time;

        if (Object.keys(data).length === 0) {
            return existing;
        }

        const updated = await this.operatingDaysRepository.updateByClinicAndDay(clinicId, dayOfWeek, data);
        return updated ?? existing;
    }
}
