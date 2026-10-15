import { AcupuncturistEntity } from "src/domain/entities/acupuncturist.entity";
import { IBaseRepository } from "./base-repository";

export interface IAcupuncturistRepository extends IBaseRepository<AcupuncturistEntity> {
  findByEmail(email: string): Promise<AcupuncturistEntity | null>;
  findByCpf(cpf: string): Promise<AcupuncturistEntity | null>;
  findCredentials(email: string): Promise<AcupuncturistEntity | null>;
  findByName(name: string): Promise<AcupuncturistEntity[]>;
}