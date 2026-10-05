import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository } from '../repositories/interfaces/i-clinic-repository';
import { ClinicEntity } from '../clinic.entity';

@Injectable()
export class CreateClinicUseCase {
    constructor(
        @Inject(IClinicRepository)
        private readonly clinicRepository: IClinicRepository,
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
