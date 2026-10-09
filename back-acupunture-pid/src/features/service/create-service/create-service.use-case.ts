import { Inject, Injectable } from '@nestjs/common';
import { IServiceRepository } from '../repositories/interfaces/i-service-repository';
import { ServiceEntity } from '../service.entity';

@Injectable()
export class CreateServiceUseCase {
    constructor(
        @Inject(IServiceRepository)
        private readonly serviceRepository: IServiceRepository,
    ) {}

    async execute(type: string): Promise<ServiceEntity> {
        return await this.serviceRepository.create({ type });
    }
}
