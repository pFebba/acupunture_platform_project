import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateClinicUseCase } from '../use-cases/create-clinic.use-case';
import { CreateClinicDTO } from '../dto/http/create-clinic.dto';
import { CreateClinicResponseDTO } from '../dto/response/create-clinic-response.dto';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly createClinicUseCase: CreateClinicUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateClinicDTO): Promise<CreateClinicResponseDTO> {
        const entity = await this.createClinicUseCase.execute(dto.name, dto.city, dto.zip_code, dto.address, dto.logo);
        return CreateClinicResponseDTO.fromEntity(entity);
    }
}