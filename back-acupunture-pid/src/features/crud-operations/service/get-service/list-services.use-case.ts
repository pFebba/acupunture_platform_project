import { Inject, Injectable } from '@nestjs/common';
import { ServiceRepository } from '../service-repository';
import { ServiceEntity } from 'src/domain/entities/service.entity';

@Injectable()
export class ListServicesUseCase {
    constructor(
        @Inject(ServiceRepository)
        private readonly serviceRepository: ServiceRepository,
    ) {}

    async execute(): Promise<ServiceEntity[]> {
        return this.serviceRepository.findAll();
    }
}
