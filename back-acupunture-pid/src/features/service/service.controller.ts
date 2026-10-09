import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateServiceUseCase } from './create-service/create-service.use-case';
import { CreateServiceDTO } from './create-service/create-service.dto';
import { CreateServiceResponseDTO } from './create-service/create-service-response.dto';

@Controller('service')
export class ServiceController {
    constructor(private readonly createServiceUseCase: CreateServiceUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateServiceDTO): Promise<CreateServiceResponseDTO> {
        const entity = await this.createServiceUseCase.execute(dto.type);
        return CreateServiceResponseDTO.fromEntity(entity);
    }
}
