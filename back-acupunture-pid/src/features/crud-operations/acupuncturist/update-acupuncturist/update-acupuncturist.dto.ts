import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator'
import { IsCpf } from 'src/common/decorators/is-cpf.decorator'

export class UpdateAcupuncturistDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    name?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'O cpf não pode estar vazio' })
    @IsCpf()
    cpf?: string

    @IsOptional()
    @IsString()
    @IsEmail({}, { message: 'Forneça um e-mail válido' })
    email?: string

    @IsOptional()
    @IsString({ message: 'A senha deve ser uma string de texto.' })
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
    @MaxLength(20, { message: 'A senha deve conter no máximo 20 caracteres.' })
    password?: string

    @IsOptional()
    @IsString({ message: 'O telefone deve ser do tipo texto' })
    phone?: string
}
