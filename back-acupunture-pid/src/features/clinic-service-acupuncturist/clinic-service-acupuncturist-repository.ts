import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { ClinicServiceAcupuncturistEntity } from './clinic-service-acupuncturist.entity';

export interface IClinicServiceAcupuncturistRepository extends IBaseRepository<ClinicServiceAcupuncturistEntity> {}

@Injectable()
export class ClinicServiceAcupuncturistRepository extends BaseRepository<ClinicServiceAcupuncturistEntity> implements IClinicServiceAcupuncturistRepository {
    constructor(
        @InjectRepository(ClinicServiceAcupuncturistEntity)
        typeOrmRepository: Repository<ClinicServiceAcupuncturistEntity>,
    ) {
        super(typeOrmRepository);
    }
}
