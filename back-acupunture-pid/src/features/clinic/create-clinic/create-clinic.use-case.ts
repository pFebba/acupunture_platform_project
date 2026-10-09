import { Inject, Injectable } from '@nestjs/common';
import { ClinicRepository } from '../clinic-repository';
import { ClinicEntity } from '../clinic.entity';

@Injectable()
export class CreateClinicUseCase {
    constructor(
        @Inject(ClinicRepository)
        private readonly clinicRepository: ClinicRepository,
    ) {}

    async execute(
        name: string,
        city: string,
        zip_code: string,
        address: string,
        logo?: string,
    ): Promise<ClinicEntity> {
        return await this.clinicRepository.create({
            name,
            city,
            zip_code,
            address,
            logo,
        });
    }
}
