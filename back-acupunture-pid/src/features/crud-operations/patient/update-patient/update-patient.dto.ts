import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    age_profile?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    @IsEmail({}, { message: 'Forneça um e-mail válido' })
    email?: string;

    @IsOptional()
    @IsString()
    profile_photo?: string;
}
