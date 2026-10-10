import { Inject, Injectable } from '@nestjs/common';
import { ClinicRepository } from '../clinic-repository';
import { ClinicEntity } from 'src/domain/entities/clinic.entity';

@Injectable()
export class ListClinicsUseCase {
    constructor(
        @Inject(ClinicRepository)
        private readonly clinicRepository: ClinicRepository,
    ) {}

    async execute(): Promise<ClinicEntity[]> {
        return this.clinicRepository.findAll();
    }
}
