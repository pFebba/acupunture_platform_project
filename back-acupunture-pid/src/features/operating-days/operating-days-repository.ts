import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { OperatingDaysEntity } from './operating-days.entity';

export interface IOperatingDaysRepository extends IBaseRepository<OperatingDaysEntity> {}

@Injectable()
export class OperatingDaysRepository extends BaseRepository<OperatingDaysEntity> implements IOperatingDaysRepository {
    constructor(
        @InjectRepository(OperatingDaysEntity)
        typeOrmRepository: Repository<OperatingDaysEntity>,
    ) {
        super(typeOrmRepository);
    }
}
