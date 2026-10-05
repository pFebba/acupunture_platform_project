import { Injectable } from "@nestjs/common";
import { IPatientRepository } from "./interfaces/i-patient-repository";
import { PatientEntity } from "../patient.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PatientRepository implements IPatientRepository {
    constructor(
        @InjectRepository(PatientEntity)
        private readonly typeOrmRepository: Repository<PatientEntity>,
    ) {}

    create(patient: Partial<PatientEntity>): Promise<PatientEntity> {
        const newPatient = this.typeOrmRepository.create(patient);
        return this.typeOrmRepository.save(newPatient);
    }
}
