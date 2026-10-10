import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { ClinicAcupuncturistEntity } from 'src/domain/entities/clinic-acupuncturist.entity';

export interface IClinicAcupuncturistRepository extends IBaseRepository<ClinicAcupuncturistEntity> {
    findByClinic(clinicId: string): Promise<ClinicAcupuncturistEntity[]>;
    findByAcupuncturist(acupuncturistId: string): Promise<ClinicAcupuncturistEntity[]>;
    deleteByCompositeKey(clinicId: string, acupuncturistId: string): Promise<boolean>;
}

@Injectable()
export class ClinicAcupuncturistRepository extends BaseRepository<ClinicAcupuncturistEntity> implements IClinicAcupuncturistRepository {
    constructor(
        @InjectRepository(ClinicAcupuncturistEntity)
        typeOrmRepository: Repository<ClinicAcupuncturistEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findByClinic(clinicId: string): Promise<ClinicAcupuncturistEntity[]> {
        return this.typeOrmRepository.find({ where: { clinic_id: clinicId } });
    }

    async findByAcupuncturist(acupuncturistId: string): Promise<ClinicAcupuncturistEntity[]> {
        return this.typeOrmRepository.find({ where: { acupuncturist_id: acupuncturistId } });
    }

    async deleteByCompositeKey(clinicId: string, acupuncturistId: string): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({ clinic_id: clinicId, acupuncturist_id: acupuncturistId });
        return (result.affected ?? 0) > 0;
    }
}
