import { IsNotEmpty, IsString } from "class-validator";

export class SignInDTO
{
@IsString()
@IsNotEmpty({message: 'O email é obrigatório'})
email: string

@IsString()
@IsNotEmpty({message: 'A senha é obrigatória'})
password: string
}