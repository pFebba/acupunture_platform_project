import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateAppointmentUseCase } from './create-appointment/create-appointment.use-case';
import { CreateAppointmentDTO } from './create-appointment/create-appointment.dto';
import { CreateAppointmentResponseDTO } from './create-appointment/create-appointment-response.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly createAppointmentUseCase: CreateAppointmentUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateAppointmentDTO): Promise<CreateAppointmentResponseDTO> {
        const entity = await this.createAppointmentUseCase.execute(dto);
        return CreateAppointmentResponseDTO.fromEntity(entity);
    }
}
