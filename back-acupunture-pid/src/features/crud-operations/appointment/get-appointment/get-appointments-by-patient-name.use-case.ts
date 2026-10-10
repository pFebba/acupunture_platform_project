import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../appointment-repository';
import { AppointmentEntity } from 'src/domain/entities/appointment.entity';

@Injectable()
export class GetAppointmentsByPatientNameUseCase {
    constructor(
        @Inject(AppointmentRepository)
        private readonly appointmentRepository: AppointmentRepository,
    ) {}

    async execute(name: string): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.findByPatientName(name);
    }
}
