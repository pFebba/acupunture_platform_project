import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAppointmentRepository } from '../repositories/interfaces/i-appointment-repository';
import { AppointmentEntity } from '../appointment.entity';
import { CreateAppointmentDTO } from '../dto/http/create-appointment.dto';

@Injectable()
export class CreateAppointmentUseCase {
    constructor(
        @Inject(IAppointmentRepository)
        private readonly appointmentRepository: IAppointmentRepository,
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