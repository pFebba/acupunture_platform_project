import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../appointment-repository';
import { AppointmentEntity } from 'src/domain/entities/appointment.entity';

@Injectable()
export class GetAppointmentsByAcupuncturistUseCase {
    constructor(
        @Inject(AppointmentRepository)
        private readonly appointmentRepository: AppointmentRepository,
    ) {}

    async execute(acupuncturistId: string, from?: Date, to?: Date): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.findByAcupuncturist(acupuncturistId, from, to);
    }
}
