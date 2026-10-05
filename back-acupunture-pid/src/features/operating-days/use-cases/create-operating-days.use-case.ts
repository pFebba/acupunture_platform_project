import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IOperatingDaysRepository } from '../repositories/interfaces/i-operating-days-repository';
import { OperatingDaysEntity } from '../operating-days.entity';
import { CreateOperatingDaysDTO } from '../dto/http/create-operating-days.dto';

@Injectable()
export class CreateOperatingDaysUseCase {
    constructor(
        @Inject(IOperatingDaysRepository)
        private readonly operatingDaysRepository: IOperatingDaysRepository,
    ) {}

    async execute(dto: CreateOperatingDaysDTO): Promise<OperatingDaysEntity> {
        const isOpen = dto.is_open ?? true;

        if (isOpen) {
            if (!dto.opening_time || !dto.closing_time) {
                throw new BadRequestException('Horários de abertura e fechamento são obrigatórios para dias abertos');
            }
            if (dto.closing_time <= dto.opening_time) {
                throw new BadRequestException('O horário de fechamento deve ser posterior ao de abertura');
            }
        }

        return await this.operatingDaysRepository.create({
            clinic_id: dto.clinic_id,
            day_of_week: dto.day_of_week,
            is_open: isOpen,
            opening_time: dto.opening_time,
            closing_time: dto.closing_time,
        });
    }
}