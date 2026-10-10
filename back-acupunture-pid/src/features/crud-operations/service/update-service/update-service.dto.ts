import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'O tipo não pode estar vazio' })
    type?: string;
}
