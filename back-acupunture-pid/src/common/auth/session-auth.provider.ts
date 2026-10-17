import { AuthenticationRegistry, SessionCookieProvider, SessionRecord } from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";
import { AcupuncturistEntity } from "src/common/domain/entities/acupuncturist.entity";
import * as iAcupuncturistRepository from "../repositories/i-acupuncturist-repository";

@Injectable()
export class SessionAuth extends SessionCookieProvider<AcupuncturistEntity> {
    constructor(
    private readonly acupuncturistRepository: iAcupuncturistRepository.IAcupuncturistRepository,
    registry: AuthenticationRegistry,

    ){
        super()
        registry.registerProvider(this)
    }

    protected validate(session: SessionRecord): AcupuncturistEntity | Promise<AcupuncturistEntity> {
        return this.acupuncturistRepository.findById(session.userId)
    }
}