import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository, IBaseRepository } from '../../../common/repositories/base-repository';
import { ServiceEntity } from 'src/domain/entities/service.entity';

export interface IServiceRepository extends IBaseRepository<ServiceEntity> {
    findByType(type: string): Promise<ServiceEntity | null>;
}

@Injectable()
export class ServiceRepository extends BaseRepository<ServiceEntity> implements IServiceRepository {
    constructor(
        @InjectRepository(ServiceEntity)
        typeOrmRepository: Repository<ServiceEntity>,
    ) {
        super(typeOrmRepository);
    }

    async findById(id: string): Promise<ServiceEntity | null> {
        return this.typeOrmRepository.findOne({ where: { service_id: id } as any });
    }

    async update(id: string, data: any): Promise<ServiceEntity | null> {
        await this.typeOrmRepository.update({ service_id: id } as any, data);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.typeOrmRepository.delete({ service_id: id } as any);
        return (result.affected ?? 0) > 0;
    }

    async findByType(type: string): Promise<ServiceEntity | null> {
        return this.typeOrmRepository.findOne({ where: { type } });
    }
}
