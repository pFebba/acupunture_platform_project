import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../common/repositories/base-repository';
import { AppointmentEntity } from './appointment.entity';

export interface IAppointmentRepository extends IBaseRepository<AppointmentEntity> {}

@Injectable()
export class AppointmentRepository extends BaseRepository<AppointmentEntity> implements IAppointmentRepository {
    constructor(
        @InjectRepository(AppointmentEntity)
        typeOrmRepository: Repository<AppointmentEntity>,
    ) {
        super(typeOrmRepository);
    }
}
