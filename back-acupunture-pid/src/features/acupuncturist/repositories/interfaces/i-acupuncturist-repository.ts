import { AcupuncturistEntity } from "../../acupuncturist.entity";


export interface IAcupuncturistRepository {
  create(user: Partial<AcupuncturistEntity>): Promise<AcupuncturistEntity>;
  findByEmail(email: string): Promise<AcupuncturistEntity | null>;
}

export const IAcupuncturistRepository = Symbol('IAcupuncturistRepository');