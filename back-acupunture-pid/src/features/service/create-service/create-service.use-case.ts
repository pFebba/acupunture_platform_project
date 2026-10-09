import { Inject, Injectable } from '@nestjs/common';
import { ServiceRepository } from '../service-repository';
import { ServiceEntity } from '../service.entity';

@Injectable()
export class CreateServiceUseCase {
    constructor(
        @Inject(ServiceRepository)
        private readonly serviceRepository: ServiceRepository,
    ) {}

    async execute(type: string): Promise<ServiceEntity> {
        return await this.serviceRepository.create({ type });
    }
}
