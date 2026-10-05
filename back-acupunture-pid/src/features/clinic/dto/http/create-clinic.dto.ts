import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateClinicDTO {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MaxLength(150)
    name: string;

    @IsOptional()
    @IsString({ message: 'O logo deve ser uma URL' })
    logo?: string;

    @IsString()
    @IsNotEmpty({ message: 'A cidade é obrigatória' })
    @MaxLength(100)
    city: string;

    @IsString()
    @IsNotEmpty({ message: 'O CEP é obrigatório' })
    @MaxLength(8)
    zip_code: string;

    @IsString()
    @IsNotEmpty({ message: 'O endereço é obrigatório' })
    @MaxLength(255)
    address: string;
}
