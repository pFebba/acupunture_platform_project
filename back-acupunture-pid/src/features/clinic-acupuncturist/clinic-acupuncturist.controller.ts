import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateClinicAcupuncturistUseCase } from './create-clinic-acupuncturist/create-clinic-acupuncturist.use-case';
import { CreateClinicAcupuncturistDTO } from './create-clinic-acupuncturist/create-clinic-acupuncturist.dto';
import { CreateClinicAcupuncturistResponseDTO } from './create-clinic-acupuncturist/create-clinic-acupuncturist-response.dto';

@Controller('clinic-acupuncturist')
export class ClinicAcupuncturistController {
    constructor(private readonly createClinicAcupuncturistUseCase: CreateClinicAcupuncturistUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateClinicAcupuncturistDTO): Promise<CreateClinicAcupuncturistResponseDTO> {
        const entity = await this.createClinicAcupuncturistUseCase.execute(dto.clinic_id, dto.acupuncturist_id);
        return CreateClinicAcupuncturistResponseDTO.fromEntity(entity);
    }
}
