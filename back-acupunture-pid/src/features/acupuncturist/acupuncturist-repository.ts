import { Injectable } from "@nestjs/common";
import { AcupuncturistEntity } from "../../domain/entities/acupuncturist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { BaseRepository, IBaseRepository } from "../../common/repositories/base-repository";

export interface IAcupuncturistRepository extends IBaseRepository<AcupuncturistEntity> {
  findByEmail(email: string): Promise<AcupuncturistEntity | null>;
  findByCpf(cpf: string): Promise<AcupuncturistEntity | null>;
  findByEmailWithPassword(email: string): Promise<AcupuncturistEntity | null>;
  findByName(name: string): Promise<AcupuncturistEntity[]>;
}

@Injectable()
export class AcupuncturistRepository extends BaseRepository<AcupuncturistEntity> implements IAcupuncturistRepository {
  constructor(
    @InjectRepository(AcupuncturistEntity)
    typeOrmRepository: Repository<AcupuncturistEntity>,
  ) {
    super(typeOrmRepository);
  }

  findByCpf(cpf: string): Promise<AcupuncturistEntity | null> {
    return this.getRepository().findOne({ where: { cpf } });
  }

  findByEmail(email: string): Promise<AcupuncturistEntity | null> {
    return this.getRepository().findOne({ where: { email } });
  }

  findByEmailWithPassword(email: string): Promise<AcupuncturistEntity | null> {
    return this.getRepository()
      .createQueryBuilder('a')
      .addSelect('a.password_hash')
      .where('a.email = :email', { email })
      .getOne();
  }

  findByName(name: string): Promise<AcupuncturistEntity[]> {
    return this.getRepository().find({ where: { name: ILike(`%${name}%`) } });
  }
}