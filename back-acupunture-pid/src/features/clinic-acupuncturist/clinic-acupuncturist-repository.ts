import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { ClinicAcupuncturistEntity } from './clinic-acupuncturist.entity';

export interface IClinicAcupuncturistRepository extends IBaseRepository<ClinicAcupuncturistEntity> {}

@Injectable()
export class ClinicAcupuncturistRepository extends BaseRepository<ClinicAcupuncturistEntity> implements IClinicAcupuncturistRepository {
    constructor(
        @InjectRepository(ClinicAcupuncturistEntity)
        typeOrmRepository: Repository<ClinicAcupuncturistEntity>,
    ) {
        super(typeOrmRepository);
    }
}
