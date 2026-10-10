import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CreateAppointmentUseCase } from './create-appointment/create-appointment.use-case';
import { CreateAppointmentDTO } from './create-appointment/create-appointment.dto';
import { CreateAppointmentResponseDTO } from './create-appointment/create-appointment-response.dto';
import { UpdateAppointmentDTO } from './update-appointment/update-appointment.dto';
import { UpdateAppointmentResponseDTO } from './update-appointment/update-appointment-response.dto';
import { UpdateAppointmentUseCase } from './update-appointment/update-appointment.use-case';
import { GetAppointmentsByPatientUseCase } from './get-appointment/get-appointments-by-patient.use-case';
import { GetAppointmentsByAcupuncturistUseCase } from './get-appointment/get-appointments-by-acupuncturist.use-case';
import { GetAppointmentsByPatientNameUseCase } from './get-appointment/get-appointments-by-patient-name.use-case';
import { GetAppointmentsResponseDTO } from './get-appointment/get-appointments-response.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(
        private readonly createAppointmentUseCase: CreateAppointmentUseCase,
        private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
        private readonly getAppointmentsByPatientUseCase: GetAppointmentsByPatientUseCase,
        private readonly getAppointmentsByAcupuncturistUseCase: GetAppointmentsByAcupuncturistUseCase,
        private readonly getAppointmentsByPatientNameUseCase: GetAppointmentsByPatientNameUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateAppointmentDTO): Promise<CreateAppointmentResponseDTO> {
        const entity = await this.createAppointmentUseCase.execute(dto);
        return CreateAppointmentResponseDTO.fromEntity(entity);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateAppointmentDTO,
    ): Promise<UpdateAppointmentResponseDTO> {
        const entity = await this.updateAppointmentUseCase.execute(id, dto);
        return UpdateAppointmentResponseDTO.fromEntity(entity);
    }

    @Get('patient/:patientId')
    async getByPatient(
        @Param('patientId', ParseUUIDPipe) patientId: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ): Promise<GetAppointmentsResponseDTO[]> {
        const entities = await this.getAppointmentsByPatientUseCase.execute(
            patientId,
            from ? new Date(from) : undefined,
            to ? new Date(to) : undefined,
        );
        return entities.map(GetAppointmentsResponseDTO.fromEntity);
    }

    @Get('acupuncturist/:acupuncturistId')
    async getByAcupuncturist(
        @Param('acupuncturistId', ParseUUIDPipe) acupuncturistId: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ): Promise<GetAppointmentsResponseDTO[]> {
        const entities = await this.getAppointmentsByAcupuncturistUseCase.execute(
            acupuncturistId,
            from ? new Date(from) : undefined,
            to ? new Date(to) : undefined,
        );
        return entities.map(GetAppointmentsResponseDTO.fromEntity);
    }

    @Get('search/patient-name')
    async searchByPatientName(
        @Query('name') name: string,
    ): Promise<GetAppointmentsResponseDTO[]> {
        const entities = await this.getAppointmentsByPatientNameUseCase.execute(name);
        return entities.map(GetAppointmentsResponseDTO.fromEntity);
    }
}
