import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { AppointmentStatus } from "../appointment-status.enum";

    export class UpdateAppointmentDTO{
        @IsOptional()
        @IsDateString({}, {message: 'A data de início deve ser uma data ISO válida!'})
        start_datetime: string;
        
        @IsOptional()
        @IsDateString({}, { message: 'A data de fim deve ser uma data ISO válida' })
        end_datetime: string;

        @IsOptional()
        @IsEnum(AppointmentStatus, { message: 'Status inválido' })
        status?: AppointmentStatus
    }