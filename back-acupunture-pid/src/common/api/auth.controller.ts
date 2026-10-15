import { Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";
import { Auth } from "../auth/auth";
import { SignInDTO } from "./dto/input/sign-in.dto";
import { Public, SignInService } from "@nestjs/authentication";

@Public()
@Controller('auth')
export class AuthController{
    constructor(
        private readonly auth: Auth,
        private readonly signInService: SignInService
    ){}
    
    @Post('sign-in')
    @HttpCode(200)
    async signIn(@Body() dto: SignInDTO){
        const acupuncturist = await this.auth.signIn(dto.email, dto.password)
        const { session } = await this.signInService.signIn(acupuncturist.id, { method: 'password' });
        
        //TO-DO MFA
        return { mfaRequired: session.mfa === 'pending' };
    }

    
}