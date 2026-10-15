import { PasswordHasher } from "@nestjs/authentication";
import { IAcupuncturistRepository } from "../repositories/i-acupuncturist-repository";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AcupuncturistEntity } from "src/domain/entities/acupuncturist.entity";

export class Auth{
    constructor(
        private readonly acupuncturistRepository: IAcupuncturistRepository,
        private readonly passwordHasher: PasswordHasher
    ){}

    async signIn(email:string, password:string): Promise<AcupuncturistEntity>{
        const acupuncturist = await this.acupuncturistRepository.findByEmail(email);

        if(acupuncturist === null){
            throw new NotFoundException('Senha ou usuário incorreto');
        }
        if(!this.passwordHasher.verify(password, acupuncturist.password_hash)){
            throw new UnauthorizedException('Senha ou usuário incorreto');
        }

        if (this.passwordHasher.needsRehash(acupuncturist.password_hash)) {
        await this.acupuncturistRepository.update(acupuncturist.id, acupuncturist);
        }

        return acupuncturist;
    }
}