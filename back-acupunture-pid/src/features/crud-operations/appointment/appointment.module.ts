import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../../../domain/entities/appointment.entity';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment-repository';
import { CreateAppointmentUseCase } from './create-appointment/create-appointment.use-case';
import { UpdateAppointmentUseCase } from './update-appointment/update-appointment.use-case';
import { GetAppointmentsByPatientUseCase } from './get-appointment/get-appointments-by-patient.use-case';
import { GetAppointmentsByAcupuncturistUseCase } from './get-appointment/get-appointments-by-acupuncturist.use-case';
import { GetAppointmentsByPatientNameUseCase } from './get-appointment/get-appointments-by-patient-name.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([AppointmentEntity])],
    controllers: [AppointmentController],
    providers: [
        AppointmentRepository,
        CreateAppointmentUseCase,
        UpdateAppointmentUseCase,
        GetAppointmentsByPatientUseCase,
        GetAppointmentsByAcupuncturistUseCase,
        GetAppointmentsByPatientNameUseCase,
    ],
})
export class AppointmentModule {}
