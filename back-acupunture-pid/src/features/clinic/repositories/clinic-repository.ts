import { Injectable } from "@nestjs/common";
import { IClinicRepository } from "./interfaces/i-clinic-repository";
import { ClinicEntity } from "../clinic.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClinicRepository implements IClinicRepository {
    constructor(
        @InjectRepository(ClinicEntity)
        private readonly typeOrmRepository: Repository<ClinicEntity>,
    ) {}

    create(clinic: Partial<ClinicEntity>): Promise<ClinicEntity> {
        const newClinic = this.typeOrmRepository.create(clinic);
        return this.typeOrmRepository.save(newClinic);
    }
}
