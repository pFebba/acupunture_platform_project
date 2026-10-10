import { IsUUID, IsInt, Min, Max, IsBoolean, IsOptional, Matches } from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export class CreateOperatingDaysDTO {
    @IsUUID('all', { message: 'A clínica deve ser um UUID válido' })
    clinic_id: string;

    @IsInt({ message: 'O dia da semana deve ser um número inteiro' })
    @Min(0, { message: 'O dia da semana deve estar entre 0 (domingo) e 6 (sábado)' })
    @Max(6, { message: 'O dia da semana deve estar entre 0 (domingo) e 6 (sábado)' })
    day_of_week: number;

    @IsOptional()
    @IsBoolean({ message: 'is_open deve ser booleano' })
    is_open?: boolean;

    @IsOptional()
    @Matches(TIME_REGEX, { message: 'O horário de abertura deve estar no formato HH:mm' })
    opening_time?: string;

    @IsOptional()
    @Matches(TIME_REGEX, { message: 'O horário de fechamento deve estar no formato HH:mm' })
    closing_time?: string;
}