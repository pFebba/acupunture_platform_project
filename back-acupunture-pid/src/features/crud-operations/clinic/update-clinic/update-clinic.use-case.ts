import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClinicRepository } from '../clinic-repository';
import { ClinicEntity } from 'src/domain/entities/clinic.entity';
import { UpdateClinicDTO } from './update-clinic.dto';

@Injectable()
export class UpdateClinicUseCase {
    constructor(
        @Inject(ClinicRepository)
        private readonly clinicRepository: ClinicRepository,
    ) {}

    async execute(id: string, dto: UpdateClinicDTO): Promise<ClinicEntity> {
        const clinic = await this.clinicRepository.findById(id);
        if (!clinic) {
            throw new NotFoundException('Clínica não encontrada');
        }

        const data: Partial<ClinicEntity> = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.logo !== undefined) data.logo = dto.logo;
        if (dto.city !== undefined) data.city = dto.city;
        if (dto.zip_code !== undefined) data.zip_code = dto.zip_code;
        if (dto.address !== undefined) data.address = dto.address;

        if (Object.keys(data).length === 0) {
            return clinic;
        }

        const updated = await this.clinicRepository.update(id, data);
        return updated ?? clinic;
    }
}
