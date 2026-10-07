import { AcupuncturistEntity } from "../../acupuncturist.entity";


export interface IAcupuncturistRepository {
  create(acupuncturist: Partial<AcupuncturistEntity>): Promise<AcupuncturistEntity>;
  findByEmail(email: string): Promise<AcupuncturistEntity | null>;
}

export const IAcupuncturistRepository = Symbol('IAcupuncturistRepository');