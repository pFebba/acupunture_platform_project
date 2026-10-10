import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateOperatingDaysUseCase } from './create-operating-days/create-operating-days.use-case';
import { CreateOperatingDaysDTO } from './create-operating-days/create-operating-days.dto';
import { CreateOperatingDaysResponseDTO } from './create-operating-days/create-operating-days-response.dto';
import { GetOperatingDaysByClinicUseCase } from './get-operating-days/get-operating-days-by-clinic.use-case';
import { GetOperatingDayByClinicAndDayUseCase } from './get-operating-days/get-operating-day-by-clinic-and-day.use-case';
import { GetOperatingDaysResponseDTO } from './get-operating-days/get-operating-days-response.dto';
import { UpdateOperatingDaysUseCase } from './update-operating-days/update-operating-days.use-case';
import { UpdateOperatingDaysDTO } from './update-operating-days/update-operating-days.dto';
import { UpdateOperatingDaysResponseDTO } from './update-operating-days/update-operating-days-response.dto';
import { DeleteOperatingDaysUseCase } from './delete-operating-days/delete-operating-days.use-case';

@Controller('operating-days')
export class OperatingDaysController {
    constructor(
        private readonly createOperatingDaysUseCase: CreateOperatingDaysUseCase,
        private readonly getOperatingDaysByClinicUseCase: GetOperatingDaysByClinicUseCase,
        private readonly getOperatingDayByClinicAndDayUseCase: GetOperatingDayByClinicAndDayUseCase,
        private readonly updateOperatingDaysUseCase: UpdateOperatingDaysUseCase,
        private readonly deleteOperatingDaysUseCase: DeleteOperatingDaysUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateOperatingDaysDTO): Promise<CreateOperatingDaysResponseDTO> {
        const entity = await this.createOperatingDaysUseCase.execute(dto);
        return CreateOperatingDaysResponseDTO.fromEntity(entity);
    }

    @Get('clinic/:clinicId')
    async getByClinic(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
    ): Promise<GetOperatingDaysResponseDTO[]> {
        const entities = await this.getOperatingDaysByClinicUseCase.execute(clinicId);
        return entities.map(GetOperatingDaysResponseDTO.fromEntity);
    }

    @Get(':clinicId/:dayOfWeek')
    async getByClinicAndDay(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('dayOfWeek', ParseIntPipe) dayOfWeek: number,
    ): Promise<GetOperatingDaysResponseDTO> {
        const entity = await this.getOperatingDayByClinicAndDayUseCase.execute(clinicId, dayOfWeek);
        return GetOperatingDaysResponseDTO.fromEntity(entity);
    }

    @Put(':clinicId/:dayOfWeek')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('dayOfWeek', ParseIntPipe) dayOfWeek: number,
        @Body() dto: UpdateOperatingDaysDTO,
    ): Promise<UpdateOperatingDaysResponseDTO> {
        const entity = await this.updateOperatingDaysUseCase.execute(clinicId, dayOfWeek, dto);
        return UpdateOperatingDaysResponseDTO.fromEntity(entity);
    }

    @Delete(':clinicId/:dayOfWeek')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('clinicId', ParseUUIDPipe) clinicId: string,
        @Param('dayOfWeek', ParseIntPipe) dayOfWeek: number,
    ): Promise<void> {
        await this.deleteOperatingDaysUseCase.execute(clinicId, dayOfWeek);
    }
}
