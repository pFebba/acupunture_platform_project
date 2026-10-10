import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { PatientEntity } from 'src/domain/entities/patient.entity';

export interface IPatientRepository extends IBaseRepository<PatientEntity> {}

@Injectable()
export class PatientRepository extends BaseRepository<PatientEntity> implements IPatientRepository {
    constructor(
        @InjectRepository(PatientEntity)
        typeOrmRepository: Repository<PatientEntity>,
    ) {
        super(typeOrmRepository);
    }
}
