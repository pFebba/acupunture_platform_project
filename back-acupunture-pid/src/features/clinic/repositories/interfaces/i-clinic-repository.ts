import { ClinicEntity } from "../../clinic.entity";

export interface IClinicRepository {
    create(clinic: Partial<ClinicEntity>): Promise<ClinicEntity>;
}

export const IClinicRepository = Symbol('IClinicRepository');
