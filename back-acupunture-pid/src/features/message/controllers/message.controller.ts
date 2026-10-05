import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateMessageUseCase } from '../use-cases/create-message.use-case';
import { CreateMessageDTO } from '../dto/http/create-message.dto';
import { CreateMessageResponseDTO } from '../dto/response/create-message-response.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly createMessageUseCase: CreateMessageUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateMessageDTO): Promise<CreateMessageResponseDTO> {
        const entity = await this.createMessageUseCase.execute(dto);
        return CreateMessageResponseDTO.fromEntity(entity);
    }
}