import { Injectable } from "@nestjs/common";
import { AcupuncturistEntity } from "../../../domain/entities/acupuncturist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base-repository";
import { IAcupuncturistRepository } from "src/common/repositories/i-acupuncturist-repository";


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

  findCredentials(email: string): Promise<AcupuncturistEntity | null> {
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