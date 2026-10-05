import { ClinicServiceAcupuncturistEntity } from "../../clinic-service-acupuncturist.entity";

export interface IClinicServiceAcupuncturistRepository {
    create(offer: Partial<ClinicServiceAcupuncturistEntity>): Promise<ClinicServiceAcupuncturistEntity>;
}

export const IClinicServiceAcupuncturistRepository = Symbol('IClinicServiceAcupuncturistRepository');