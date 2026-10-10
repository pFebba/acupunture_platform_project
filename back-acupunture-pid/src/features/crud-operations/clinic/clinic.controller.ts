import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateClinicUseCase } from './create-clinic/create-clinic.use-case';
import { CreateClinicDTO } from './create-clinic/create-clinic.dto';
import { CreateClinicResponseDTO } from './create-clinic/create-clinic-response.dto';
import { GetClinicUseCase } from './get-clinic/get-clinic.use-case';
import { ListClinicsUseCase } from './get-clinic/list-clinics.use-case';
import { GetClinicResponseDTO } from './get-clinic/get-clinic-response.dto';
import { UpdateClinicUseCase } from './update-clinic/update-clinic.use-case';
import { UpdateClinicDTO } from './update-clinic/update-clinic.dto';
import { UpdateClinicResponseDTO } from './update-clinic/update-clinic-response.dto';
import { DeleteClinicUseCase } from './delete-clinic/delete-clinic.use-case';

@Controller('clinic')
export class ClinicController {
    constructor(
        private readonly createClinicUseCase: CreateClinicUseCase,
        private readonly getClinicUseCase: GetClinicUseCase,
        private readonly listClinicsUseCase: ListClinicsUseCase,
        private readonly updateClinicUseCase: UpdateClinicUseCase,
        private readonly deleteClinicUseCase: DeleteClinicUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateClinicDTO): Promise<CreateClinicResponseDTO> {
        const entity = await this.createClinicUseCase.execute(dto.name, dto.city, dto.zip_code, dto.address, dto.logo);
        return CreateClinicResponseDTO.fromEntity(entity);
    }

    @Get()
    async list(): Promise<GetClinicResponseDTO[]> {
        const entities = await this.listClinicsUseCase.execute();
        return entities.map(GetClinicResponseDTO.fromEntity);
    }

    @Get(':id')
    async getById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<GetClinicResponseDTO> {
        const entity = await this.getClinicUseCase.execute(id);
        return GetClinicResponseDTO.fromEntity(entity);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateClinicDTO,
    ): Promise<UpdateClinicResponseDTO> {
        const entity = await this.updateClinicUseCase.execute(id, dto);
        return UpdateClinicResponseDTO.fromEntity(entity);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.deleteClinicUseCase.execute(id);
    }
}
