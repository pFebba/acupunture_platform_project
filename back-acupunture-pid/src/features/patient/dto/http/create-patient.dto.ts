import { IsString, IsNotEmpty, IsOptional, IsEmail, MaxLength } from 'class-validator';

export class CreatePatientDTO {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MaxLength(150)
    name: string;

    @IsOptional()
    @IsString({ message: 'O perfil de idade deve ser uma string' })
    @MaxLength(50)
    age_profile?: string;

    @IsString()
    @IsNotEmpty({ message: 'O telefone é obrigatório' })
    @MaxLength(20)
    phone: string;

    @IsOptional()
    @IsEmail({}, { message: 'Forneça um e-mail válido' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'A foto de perfil deve ser uma URL' })
    profile_photo?: string;
}
