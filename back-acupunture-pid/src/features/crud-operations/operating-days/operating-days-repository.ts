import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { OperatingDaysEntity } from 'src/domain/entities/operating-days.entity';

export interface IOperatingDaysRepository extends IBaseRepository<OperatingDaysEntity> {
    findByClinic(clinicId: string): Promise<OperatingDaysEntity[]>;
    findByClinicAndDay(clinicId: string, dayOfWeek: number): Promise<OperatingDaysEntity | null>;
    updateByClinicAndDay(clinicId: string, dayOfWeek: number, data: Partial<OperatingDaysEntity>): Promise<OperatingDaysEntity | null>;
    deleteByClinicAndDay(clinicId: string, dayOfWeek: number): Promise<boolean>;
}

@Injectable()
export class OperatingDaysRepository extends BaseRepository<OperatingDaysEntity> implements IOperatingDaysRepository {
    constructor(
        @InjectRepository(OperatingDaysEntity)
        typeOrmRepository: Repository<OperatingDaysEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findByClinic(clinicId: string): Promise<OperatingDaysEntity[]> {
        return this.typeOrmRepository.find({ where: { clinic_id: clinicId }, order: { day_of_week: 'ASC' } });
    }

    async findByClinicAndDay(clinicId: string, dayOfWeek: number): Promise<OperatingDaysEntity | null> {
        return this.typeOrmRepository.findOne({ where: { clinic_id: clinicId, day_of_week: dayOfWeek } });
    }

    async updateByClinicAndDay(clinicId: string, dayOfWeek: number, data: Partial<OperatingDaysEntity>): Promise<OperatingDaysEntity | null> {
        await this.typeOrmRepository.update({ clinic_id: clinicId, day_of_week: dayOfWeek }, data);
        return this.findByClinicAndDay(clinicId, dayOfWeek);
    }

    async deleteByClinicAndDay(clinicId: string, dayOfWeek: number): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({ clinic_id: clinicId, day_of_week: dayOfWeek });
        return (result.affected ?? 0) > 0;
    }
}
