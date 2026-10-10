import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClinicRepository } from '../clinic-repository';

@Injectable()
export class DeleteClinicUseCase {
    constructor(
        @Inject(ClinicRepository)
        private readonly clinicRepository: ClinicRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const deleted = await this.clinicRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException('Clínica não encontrada');
        }
    }
}
