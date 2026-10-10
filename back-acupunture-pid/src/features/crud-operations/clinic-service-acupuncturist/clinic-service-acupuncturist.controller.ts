import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateClinicServiceAcupuncturistUseCase } from './create-clinic-service-acupuncturist/create-clinic-service-acupuncturist.use-case';
import { CreateClinicServiceAcupuncturistDTO } from './create-clinic-service-acupuncturist/create-clinic-service-acupuncturist.dto';
import { CreateClinicServiceAcupuncturistResponseDTO } from './create-clinic-service-acupuncturist/create-clinic-service-acupuncturist-response.dto';
import { GetClinicServiceAcupuncturistUseCase } from './get-clinic-service-acupuncturist/get-clinic-service-acupuncturist.use-case';
import { GetClinicServiceAcupuncturistResponseDTO } from './get-clinic-service-acupuncturist/get-clinic-service-acupuncturist-response.dto';
import { UpdateClinicServiceAcupuncturistUseCase } from './update-clinic-service-acupuncturist/update-clinic-service-acupuncturist.use-case';
import { UpdateClinicServiceAcupuncturistDTO } from './update-clinic-service-acupuncturist/update-clinic-service-acupuncturist.dto';
import { UpdateClinicServiceAcupuncturistResponseDTO } from './update-clinic-service-acupuncturist/update-clinic-service-acupuncturist-response.dto';
import { DeleteClinicServiceAcupuncturistUseCase } from './delete-clinic-service-acupuncturist/delete-clinic-service-acupuncturist.use-case';

@Controller('clinic-service-acupuncturist')
export class ClinicServiceAcupuncturistController {
    constructor(
        private readonly createClinicServiceAcupuncturistUseCase: CreateClinicServiceAcupuncturistUseCase,
        private readonly getClinicServiceAcupuncturistUseCase: GetClinicServiceAcupuncturistUseCase,
        private readonly updateClinicServiceAcupuncturistUseCase: UpdateClinicServiceAcupuncturistUseCase,
        private readonly deleteClinicServiceAcupuncturistUseCase: DeleteClinicServiceAcupuncturistUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateClinicServiceAcupuncturistDTO): Promise<CreateClinicServiceAcupuncturistResponseDTO> {
        const entity = await this.createClinicServiceAcupuncturistUseCase.execute(dto);
        return CreateClinicServiceAcupuncturistResponseDTO.fromEntity(entity);
    }

    @Get('clinic/:clinicId/acupuncturist/:acupuncturistId')
    async getByClinicAndAcupuncturist(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('acupuncturistId', ParseUUIDPipe) acupuncturistId: string,
    ): Promise<GetClinicServiceAcupuncturistResponseDTO[]> {
        const entities = await this.getClinicServiceAcupuncturistUseCase.execute(clinicId, acupuncturistId);
        return entities.map(GetClinicServiceAcupuncturistResponseDTO.fromEntity);
    }

    @Put(':clinicId/:serviceId/:acupuncturistId')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('serviceId', ParseUUIDPipe) serviceId: string,
        @Param('acupuncturistId', ParseUUIDPipe) acupuncturistId: string,
        @Body() dto: UpdateClinicServiceAcupuncturistDTO,
    ): Promise<UpdateClinicServiceAcupuncturistResponseDTO> {
        const entity = await this.updateClinicServiceAcupuncturistUseCase.execute(clinicId, serviceId, acupuncturistId, dto);
        return UpdateClinicServiceAcupuncturistResponseDTO.fromEntity(entity);
    }

    @Delete(':clinicId/:serviceId/:acupuncturistId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('serviceId', ParseUUIDPipe) serviceId: string,
        @Param('acupuncturistId', ParseUUIDPipe) acupuncturistId: string,
    ): Promise<void> {
        await this.deleteClinicServiceAcupuncturistUseCase.execute(clinicId, serviceId, acupuncturistId);
    }
}
