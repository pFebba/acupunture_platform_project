import { IsNumber, Min } from 'class-validator';

export class UpdateClinicServiceAcupuncturistDTO {
    @IsNumber({}, { message: 'O preço deve ser um número' })
    @Min(0, { message: 'O preço não pode ser negativo' })
    price: number;
}
