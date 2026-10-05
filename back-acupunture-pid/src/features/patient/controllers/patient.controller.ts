import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreatePatientUseCase } from '../use-cases/create-patient.use-case';
import { CreatePatientDTO } from '../dto/http/create-patient.dto';
import { CreatePatientResponseDTO } from '../dto/response/create-patient-response.dto';

@Controller('patient')
export class PatientController {
    constructor(private readonly createPatientUseCase: CreatePatientUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreatePatientDTO): Promise<CreatePatientResponseDTO> {
        const entity = await this.createPatientUseCase.execute(dto.name, dto.phone, dto.age_profile, dto.email, dto.profile_photo);
        return CreatePatientResponseDTO.fromEntity(entity);
    }
}