import { IsUUID, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../../appointment-status.enum';

export class CreateAppointmentDTO {
    @IsUUID('all', { message: 'O acupunturista deve ser um UUID válido' })
    acupuncturist_id: string;

    @IsUUID('all', { message: 'O serviço deve ser um UUID válido' })
    service_id: string;

    @IsUUID('all', { message: 'O paciente deve ser um UUID válido' })
    patient_id: string;

    @IsUUID('all', { message: 'A clínica deve ser um UUID válido' })
    clinic_id: string;

    @IsDateString({}, { message: 'A data de início deve ser uma data ISO válida' })
    start_datetime: string;

    @IsDateString({}, { message: 'A data de fim deve ser uma data ISO válida' })
    end_datetime: string;

    @IsOptional()
    @IsEnum(AppointmentStatus, { message: 'Status inválido' })
    status?: AppointmentStatus;
}