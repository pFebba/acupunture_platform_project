import { IsOptional, IsString } from 'class-validator';

export class UpdateClinicDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    logo?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    zip_code?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
