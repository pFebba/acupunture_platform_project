import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateAppointmentUseCase } from './create-appointment/create-appointment.use-case';
import { CreateAppointmentDTO } from './create-appointment/create-appointment.dto';
import { CreateAppointmentResponseDTO } from './create-appointment/create-appointment-response.dto';
import { UpdateAppointmentDTO } from './update-appointment/update-appointment.dto';
import { UpdateAppointmentResponseDTO } from './update-appointment/update-appointment-response.dto';
import { UpdateAppointmentUseCase } from './update-appointment/update-appointment.use-case';

@Controller('appointment')
export class AppointmentController {
    constructor(
        private readonly createAppointmentUseCase: CreateAppointmentUseCase,
        private readonly updateAppointmentUseCase: UpdateAppointmentUseCase
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateAppointmentDTO): Promise<CreateAppointmentResponseDTO> {
        const entity = await this.createAppointmentUseCase.execute(dto);
        return CreateAppointmentResponseDTO.fromEntity(entity);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(    
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateAppointmentDTO
    ): Promise<UpdateAppointmentResponseDTO>{
        const entity = await this.updateAppointmentUseCase.execute(id, dto)
        return  UpdateAppointmentResponseDTO.fromEntity(entity)
    }
}
