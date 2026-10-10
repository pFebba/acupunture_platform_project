import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../service-repository';

@Injectable()
export class DeleteServiceUseCase {
    constructor(
        @Inject(ServiceRepository)
        private readonly serviceRepository: ServiceRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const deleted = await this.serviceRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException('Serviço não encontrado');
        }
    }
}
