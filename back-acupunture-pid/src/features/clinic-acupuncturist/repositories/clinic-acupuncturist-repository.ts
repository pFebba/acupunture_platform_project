import { Injectable } from "@nestjs/common";
import { IClinicAcupuncturistRepository } from "./interfaces/i-clinic-acupuncturist-repository";
import { ClinicAcupuncturistEntity } from "../clinic-acupuncturist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClinicAcupuncturistRepository implements IClinicAcupuncturistRepository {
    constructor(
        @InjectRepository(ClinicAcupuncturistEntity)
        private readonly typeOrmRepository: Repository<ClinicAcupuncturistEntity>,
    ) {}

    create(link: Partial<ClinicAcupuncturistEntity>): Promise<ClinicAcupuncturistEntity> {
        const newLink = this.typeOrmRepository.create(link);
        return this.typeOrmRepository.save(newLink);
    }
}