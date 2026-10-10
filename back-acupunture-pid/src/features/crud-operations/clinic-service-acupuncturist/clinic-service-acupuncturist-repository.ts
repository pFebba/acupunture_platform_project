import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { ClinicServiceAcupuncturistEntity } from 'src/domain/entities/clinic-service-acupuncturist.entity';

export interface IClinicServiceAcupuncturistRepository extends IBaseRepository<ClinicServiceAcupuncturistEntity> {
    findByClinicAndAcupuncturist(clinicId: string, acupuncturistId: string): Promise<ClinicServiceAcupuncturistEntity[]>;
    updatePrice(clinicId: string, serviceId: string, acupuncturistId: string, price: number): Promise<ClinicServiceAcupuncturistEntity | null>;
    deleteByCompositeKey(clinicId: string, serviceId: string, acupuncturistId: string): Promise<boolean>;
}

@Injectable()
export class ClinicServiceAcupuncturistRepository extends BaseRepository<ClinicServiceAcupuncturistEntity> implements IClinicServiceAcupuncturistRepository {
    constructor(
        @InjectRepository(ClinicServiceAcupuncturistEntity)
        typeOrmRepository: Repository<ClinicServiceAcupuncturistEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findByClinicAndAcupuncturist(clinicId: string, acupuncturistId: string): Promise<ClinicServiceAcupuncturistEntity[]> {
        return this.typeOrmRepository.find({
            where: { clinic_id: clinicId, acupuncturist_id: acupuncturistId },
        });
    }

    async updatePrice(clinicId: string, serviceId: string, acupuncturistId: string, price: number): Promise<ClinicServiceAcupuncturistEntity | null> {
        await this.typeOrmRepository.update(
            { clinic_id: clinicId, service_id: serviceId, acupuncturist_id: acupuncturistId },
            { price },
        );
        const result = await this.typeOrmRepository.findOne({
            where: { clinic_id: clinicId, service_id: serviceId, acupuncturist_id: acupuncturistId },
        });
        return result ?? null;
    }

    async deleteByCompositeKey(clinicId: string, serviceId: string, acupuncturistId: string): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({
            clinic_id: clinicId,
            service_id: serviceId,
            acupuncturist_id: acupuncturistId,
        });
        return (result.affected ?? 0) > 0;
    }
}
