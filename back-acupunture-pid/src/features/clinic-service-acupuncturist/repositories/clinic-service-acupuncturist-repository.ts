import { Injectable } from "@nestjs/common";
import { IClinicServiceAcupuncturistRepository } from "./interfaces/i-clinic-service-acupuncturist-repository";
import { ClinicServiceAcupuncturistEntity } from "../clinic-service-acupuncturist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClinicServiceAcupuncturistRepository implements IClinicServiceAcupuncturistRepository {
    constructor(
        @InjectRepository(ClinicServiceAcupuncturistEntity)
        private readonly typeOrmRepository: Repository<ClinicServiceAcupuncturistEntity>,
    ) {}

    create(offer: Partial<ClinicServiceAcupuncturistEntity>): Promise<ClinicServiceAcupuncturistEntity> {
        const newOffer = this.typeOrmRepository.create(offer);
        return this.typeOrmRepository.save(newOffer);
    }
}