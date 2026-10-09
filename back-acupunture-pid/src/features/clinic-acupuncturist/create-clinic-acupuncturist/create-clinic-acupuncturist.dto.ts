import { IsUUID } from 'class-validator';

export class CreateClinicAcupuncturistDTO {
    @IsUUID('all', { message: 'A clínica deve ser um UUID válido' })
    clinic_id: string;

    @IsUUID('all', { message: 'O acupunturista deve ser um UUID válido' })
    acupuncturist_id: string;
}