import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, MoreThanOrEqual, LessThan, Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { AppointmentEntity } from 'src/domain/entities/appointment.entity';
import { PatientEntity } from 'src/domain/entities/patient.entity';

export interface IAppointmentRepository extends IBaseRepository<AppointmentEntity> {
    findByPatient(patientId: string, from?: Date, to?: Date): Promise<AppointmentEntity[]>;
    findByAcupuncturist(acupuncturistId: string, from?: Date, to?: Date): Promise<AppointmentEntity[]>;
    findByPatientName(name: string): Promise<AppointmentEntity[]>;
}

@Injectable()
export class AppointmentRepository extends BaseRepository<AppointmentEntity> implements IAppointmentRepository {
    constructor(
        @InjectRepository(AppointmentEntity)
        typeOrmRepository: Repository<AppointmentEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findById(id: string): Promise<AppointmentEntity | null> {
        return this.typeOrmRepository.findOne({ where: { appointment_id: id } as any });
    }

    async update(id: string, data: any): Promise<AppointmentEntity | null> {
        await this.typeOrmRepository.update({ appointment_id: id } as any, data);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({ appointment_id: id } as any);
        return (result.affected ?? 0) > 0;
    }

    async findByPatient(patientId: string, from?: Date, to?: Date): Promise<AppointmentEntity[]> {
        const where: FindOptionsWhere<AppointmentEntity> = { patient_id: patientId };
        if (from && to) where.start_datetime = Between(from, to);
        else if (from) where.start_datetime = MoreThanOrEqual(from);
        else if (to) where.start_datetime = LessThan(to);
        return this.typeOrmRepository.find({ where, order: { start_datetime: 'ASC' } });
    }

    async findByAcupuncturist(acupuncturistId: string, from?: Date, to?: Date): Promise<AppointmentEntity[]> {
        const where: FindOptionsWhere<AppointmentEntity> = { acupuncturist_id: acupuncturistId };
        if (from && to) where.start_datetime = Between(from, to);
        else if (from) where.start_datetime = MoreThanOrEqual(from);
        else if (to) where.start_datetime = LessThan(to);
        return this.typeOrmRepository.find({ where, order: { start_datetime: 'ASC' } });
    }

    async findByPatientName(name: string): Promise<AppointmentEntity[]> {
        return this.typeOrmRepository
            .createQueryBuilder('appointment')
            .innerJoin(PatientEntity, 'p', 'p.id = appointment.patient_id')
            .where('p.name ILIKE :name', { name: `%${name}%` })
            .orderBy('appointment.start_datetime', 'ASC')
            .getMany();
    }
}
