import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { ClinicEntity } from './clinic.entity';

export interface IClinicRepository extends IBaseRepository<ClinicEntity> {}

@Injectable()
export class ClinicRepository extends BaseRepository<ClinicEntity> implements IClinicRepository {
    constructor(
        @InjectRepository(ClinicEntity)
        typeOrmRepository: Repository<ClinicEntity>,
    ) {
        super(typeOrmRepository);
    }
}
