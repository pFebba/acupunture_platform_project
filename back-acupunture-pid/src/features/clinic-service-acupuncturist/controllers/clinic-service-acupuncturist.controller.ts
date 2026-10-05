import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateClinicServiceAcupuncturistUseCase } from '../use-cases/create-clinic-service-acupuncturist.use-case';
import { CreateClinicServiceAcupuncturistDTO } from '../dto/http/create-clinic-service-acupuncturist.dto';
import { CreateClinicServiceAcupuncturistResponseDTO } from '../dto/response/create-clinic-service-acupuncturist-response.dto';

@Controller('clinic-service-acupuncturist')
export class ClinicServiceAcupuncturistController {
    constructor(private readonly createClinicServiceAcupuncturistUseCase: CreateClinicServiceAcupuncturistUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateClinicServiceAcupuncturistDTO): Promise<CreateClinicServiceAcupuncturistResponseDTO> {
        const entity = await this.createClinicServiceAcupuncturistUseCase.execute(dto);
        return CreateClinicServiceAcupuncturistResponseDTO.fromEntity(entity);
    }
}