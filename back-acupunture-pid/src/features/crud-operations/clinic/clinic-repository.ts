import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { ClinicEntity } from 'src/domain/entities/clinic.entity';

export interface IClinicRepository extends IBaseRepository<ClinicEntity> {}

@Injectable()
export class ClinicRepository extends BaseRepository<ClinicEntity> implements IClinicRepository {
    constructor(
        @InjectRepository(ClinicEntity)
        typeOrmRepository: Repository<ClinicEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findById(id: string): Promise<ClinicEntity | null> {
        return this.typeOrmRepository.findOne({ where: { clinic_id: id } as any });
    }

    async update(id: string, data: any): Promise<ClinicEntity | null> {
        await this.typeOrmRepository.update({ clinic_id: id } as any, data);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({ clinic_id: id } as any);
        return (result.affected ?? 0) > 0;
    }
}
