import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateMessageUseCase } from './create-message/create-message.use-case';
import { CreateMessageDTO } from './create-message/create-message.dto';
import { CreateMessageResponseDTO } from './create-message/create-message-response.dto';
import { GetMessagesByAppointmentUseCase } from './get-message/get-messages-by-appointment.use-case';
import { GetMessagesByAppointmentResponseDTO } from './get-message/get-messages-by-appointment-response.dto';

@Controller('message')
export class MessageController {
    constructor(
        private readonly createMessageUseCase: CreateMessageUseCase,
        private readonly getMessagesByAppointmentUseCase: GetMessagesByAppointmentUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateMessageDTO): Promise<CreateMessageResponseDTO> {
        const entity = await this.createMessageUseCase.execute(dto);
        return CreateMessageResponseDTO.fromEntity(entity);
    }

    @Get('appointment/:appointmentId')
    async getByAppointment(
        @Param('appointmentId', ParseUUIDPipe) appointmentId: string,
    ): Promise<GetMessagesByAppointmentResponseDTO[]> {
        const entities = await this.getMessagesByAppointmentUseCase.execute(appointmentId);
        return entities.map(GetMessagesByAppointmentResponseDTO.fromEntity);
    }
}
