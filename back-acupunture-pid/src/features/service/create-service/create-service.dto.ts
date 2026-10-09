import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateServiceDTO {
    @IsString()
    @IsNotEmpty({ message: 'O tipo de serviço é obrigatório' })
    @MaxLength(100)
    type: string;
}
