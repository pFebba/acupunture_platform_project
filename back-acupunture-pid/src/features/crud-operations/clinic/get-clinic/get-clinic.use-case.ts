import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClinicRepository } from '../clinic-repository';
import { ClinicEntity } from 'src/domain/entities/clinic.entity';

@Injectable()
export class GetClinicUseCase {
    constructor(
        @Inject(ClinicRepository)
        private readonly clinicRepository: ClinicRepository,
    ) {}

    async execute(id: string): Promise<ClinicEntity> {
        const clinic = await this.clinicRepository.findById(id);
        if (!clinic) {
            throw new NotFoundException('Clínica não encontrada');
        }
        return clinic;
    }
}
