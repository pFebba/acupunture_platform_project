import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateServiceUseCase } from './create-service/create-service.use-case';
import { CreateServiceDTO } from './create-service/create-service.dto';
import { CreateServiceResponseDTO } from './create-service/create-service-response.dto';
import { GetServiceUseCase } from './get-service/get-service.use-case';
import { ListServicesUseCase } from './get-service/list-services.use-case';
import { GetServiceResponseDTO } from './get-service/get-service-response.dto';
import { UpdateServiceUseCase } from './update-service/update-service.use-case';
import { UpdateServiceDTO } from './update-service/update-service.dto';
import { UpdateServiceResponseDTO } from './update-service/update-service-response.dto';
import { DeleteServiceUseCase } from './delete-service/delete-service.use-case';

@Controller('service')
export class ServiceController {
    constructor(
        private readonly createServiceUseCase: CreateServiceUseCase,
        private readonly getServiceUseCase: GetServiceUseCase,
        private readonly listServicesUseCase: ListServicesUseCase,
        private readonly updateServiceUseCase: UpdateServiceUseCase,
        private readonly deleteServiceUseCase: DeleteServiceUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateServiceDTO): Promise<CreateServiceResponseDTO> {
        const entity = await this.createServiceUseCase.execute(dto.type);
        return CreateServiceResponseDTO.fromEntity(entity);
    }

    @Get()
    async list(): Promise<GetServiceResponseDTO[]> {
        const entities = await this.listServicesUseCase.execute();
        return entities.map(GetServiceResponseDTO.fromEntity);
    }

    @Get(':id')
    async getById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<GetServiceResponseDTO> {
        const entity = await this.getServiceUseCase.execute(id);
        return GetServiceResponseDTO.fromEntity(entity);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateServiceDTO,
    ): Promise<UpdateServiceResponseDTO> {
        const entity = await this.updateServiceUseCase.execute(id, dto);
        return UpdateServiceResponseDTO.fromEntity(entity);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.deleteServiceUseCase.execute(id);
    }
}
