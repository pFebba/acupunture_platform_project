import { PatientEntity } from "../../patient.entity";

export interface IPatientRepository {
    create(patient: Partial<PatientEntity>): Promise<PatientEntity>;
}

export const IPatientRepository = Symbol('IPatientRepository');
