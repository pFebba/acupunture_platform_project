import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../appointment-repository';
import { CreateAppointmentDTO } from './create-appointment.dto';
import { AppointmentEntity } from 'src/domain/entities/appointment.entity';

@Injectable()
export class CreateAppointmentUseCase {
    constructor(
        @Inject(AppointmentRepository)
        private readonly appointmentRepository: AppointmentRepository,
    ) {}

    async execute(dto: CreateAppointmentDTO): Promise<AppointmentEntity> {
        const start = new Date(dto.start_datetime);
        const end = new Date(dto.end_datetime);

        if (end <= start) {
            throw new BadRequestException('A data de fim deve ser posterior à data de início');
        }

        return await this.appointmentRepository.create({
            acupuncturist_id: dto.acupuncturist_id,
            service_id: dto.service_id,
            patient_id: dto.patient_id,
            clinic_id: dto.clinic_id,
            start_datetime: start,
            end_datetime: end,
            status: dto.status,
        });
    }
}