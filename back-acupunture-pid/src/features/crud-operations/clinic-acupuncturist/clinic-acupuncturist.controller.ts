import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateClinicAcupuncturistUseCase } from './create-clinic-acupuncturist/create-clinic-acupuncturist.use-case';
import { CreateClinicAcupuncturistDTO } from './create-clinic-acupuncturist/create-clinic-acupuncturist.dto';
import { CreateClinicAcupuncturistResponseDTO } from './create-clinic-acupuncturist/create-clinic-acupuncturist-response.dto';
import { GetClinicAcupuncturistByClinicUseCase } from './get-clinic-acupuncturist/get-clinic-acupuncturist-by-clinic.use-case';
import { GetClinicAcupuncturistByAcupuncturistUseCase } from './get-clinic-acupuncturist/get-clinic-acupuncturist-by-acupuncturist.use-case';
import { GetClinicAcupuncturistResponseDTO } from './get-clinic-acupuncturist/get-clinic-acupuncturist-response.dto';
import { DeleteClinicAcupuncturistUseCase } from './delete-clinic-acupuncturist/delete-clinic-acupuncturist.use-case';

@Controller('clinic-acupuncturist')
export class ClinicAcupuncturistController {
    constructor(
        private readonly createClinicAcupuncturistUseCase: CreateClinicAcupuncturistUseCase,
        private readonly getByClinicUseCase: GetClinicAcupuncturistByClinicUseCase,
        private readonly getByAcupuncturistUseCase: GetClinicAcupuncturistByAcupuncturistUseCase,
        private readonly deleteClinicAcupuncturistUseCase: DeleteClinicAcupuncturistUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateClinicAcupuncturistDTO): Promise<CreateClinicAcupuncturistResponseDTO> {
        const entity = await this.createClinicAcupuncturistUseCase.execute(dto.clinic_id, dto.acupuncturist_id);
        return CreateClinicAcupuncturistResponseDTO.fromEntity(entity);
    }

    @Get('clinic/:clinicId')
    async getByClinic(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
    ): Promise<GetClinicAcupuncturistResponseDTO[]> {
        const entities = await this.getByClinicUseCase.execute(clinicId);
        return entities.map(GetClinicAcupuncturistResponseDTO.fromEntity);
    }

    @Get('acupuncturist/:acupuncturistId')
    async getByAcupuncturist(
        @Param('acupuncturistId', ParseUUIDPipe) acupuncturistId: string,
    ): Promise<GetClinicAcupuncturistResponseDTO[]> {
        const entities = await this.getByAcupuncturistUseCase.execute(acupuncturistId);
        return entities.map(GetClinicAcupuncturistResponseDTO.fromEntity);
    }

    @Delete(':clinicId/:acupuncturistId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('acupuncturistId', ParseUUIDPipe) acupuncturistId: string,
    ): Promise<void> {
        await this.deleteClinicAcupuncturistUseCase.execute(clinicId, acupuncturistId);
    }
}
