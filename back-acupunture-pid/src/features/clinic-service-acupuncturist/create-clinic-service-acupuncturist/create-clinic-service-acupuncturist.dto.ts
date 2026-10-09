import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreateClinicServiceAcupuncturistDTO {
    @IsUUID('all', { message: 'A clínica deve ser um UUID válido' })
    clinic_id: string;

    @IsUUID('all', { message: 'O serviço deve ser um UUID válido' })
    service_id: string;

    @IsUUID('all', { message: 'O acupunturista deve ser um UUID válido' })
    acupuncturist_id: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ter no máximo 2 casas decimais' })
    @Min(0, { message: 'O preço não pode ser negativo' })
    price: number;
}