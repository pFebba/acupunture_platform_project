import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { ServiceEntity } from './service.entity';

export interface IServiceRepository extends IBaseRepository<ServiceEntity> {}

@Injectable()
export class ServiceRepository extends BaseRepository<ServiceEntity> implements IServiceRepository {
    constructor(
        @InjectRepository(ServiceEntity)
        typeOrmRepository: Repository<ServiceEntity>,
    ) {
        super(typeOrmRepository);
    }
}
