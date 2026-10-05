import { ClinicAcupuncturistEntity } from "../../clinic-acupuncturist.entity";

export interface IClinicAcupuncturistRepository {
    create(link: Partial<ClinicAcupuncturistEntity>): Promise<ClinicAcupuncturistEntity>;
}

export const IClinicAcupuncturistRepository = Symbol('IClinicAcupuncturistRepository');