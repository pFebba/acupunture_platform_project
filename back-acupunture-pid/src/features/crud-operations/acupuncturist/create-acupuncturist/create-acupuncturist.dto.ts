import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator'
import { IsCpf } from 'src/common/decorators/is-cpf.decorator'


export class CreateAcupuncturistDTO{
    @IsString()
    @IsNotEmpty({message: 'O nome é obrigatóirio'})
    name: string

    @IsString()
    @IsNotEmpty({message: 'O cpf é obrigatóirio'})
    @IsCpf()
    cpf: string

    @IsString()
    @IsEmail({}, { message: 'Forneça um e-mail válido' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    email: string

    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @IsString({ message: 'A senha deve ser uma string de texto.' })
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
    @MaxLength(20, { message: 'A senha deve conter no máximo 20 caracteres.' })
    password: string

    @IsOptional()
    @IsString({message: 'O telefone deve ser do tipo texto'})
    phone?:string

}