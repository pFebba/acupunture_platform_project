import { Injectable } from "@nestjs/common";
import { IAcupuncturistRepository } from "./interfaces/i-acupuncturist-repository";
import { AcupuncturistEntity } from "../acupuncturist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AcupuncturistRepository implements IAcupuncturistRepository{
    constructor(
    @InjectRepository(AcupuncturistEntity)
    private readonly typeOrmRepository: Repository<AcupuncturistEntity>,
  ) {}
    create(acupuncturist: Partial<AcupuncturistEntity>): Promise<AcupuncturistEntity> {
        const newAcupuncturist = this.typeOrmRepository.create()
        return this.typeOrmRepository.save(newAcupuncturist);
    }

    findByEmail(email: string): Promise<AcupuncturistEntity | null> {
        return this.typeOrmRepository.findOne({ where: { email } });
    }
    
}