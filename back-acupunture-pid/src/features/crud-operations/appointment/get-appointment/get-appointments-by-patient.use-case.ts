import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../appointment-repository';
import { AppointmentEntity } from 'src/domain/entities/appointment.entity';

@Injectable()
export class GetAppointmentsByPatientUseCase {
    constructor(
        @Inject(AppointmentRepository)
        private readonly appointmentRepository: AppointmentRepository,
    ) {}

    async execute(patientId: string, from?: Date, to?: Date): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.findByPatient(patientId, from, to);
    }
}
