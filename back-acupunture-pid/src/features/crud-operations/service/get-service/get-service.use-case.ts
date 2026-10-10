import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../service-repository';
import { ServiceEntity } from 'src/domain/entities/service.entity';

@Injectable()
export class GetServiceUseCase {
    constructor(
        @Inject(ServiceRepository)
        private readonly serviceRepository: ServiceRepository,
    ) {}

    async execute(id: string): Promise<ServiceEntity> {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new NotFoundException('Serviço não encontrado');
        }
        return service;
    }
}
