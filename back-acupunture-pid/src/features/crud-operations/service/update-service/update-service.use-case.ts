import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../service-repository';
import { ServiceEntity } from 'src/domain/entities/service.entity';
import { UpdateServiceDTO } from './update-service.dto';

@Injectable()
export class UpdateServiceUseCase {
    constructor(
        @Inject(ServiceRepository)
        private readonly serviceRepository: ServiceRepository,
    ) {}

    async execute(id: string, dto: UpdateServiceDTO): Promise<ServiceEntity> {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new NotFoundException('Serviço não encontrado');
        }

        if (dto.type && dto.type !== service.type) {
            const typeInUse = await this.serviceRepository.findByType(dto.type);
            if (typeInUse) {
                throw new ConflictException('Já existe um serviço com este tipo');
            }
        }

        if (!dto.type) {
            return service;
        }

        const updated = await this.serviceRepository.update(id, { type: dto.type });
        return updated ?? service;
    }
}
