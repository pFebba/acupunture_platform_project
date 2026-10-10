import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreatePatientUseCase } from './create-patient/create-patient.use-case';
import { CreatePatientDTO } from './create-patient/create-patient.dto';
import { CreatePatientResponseDTO } from './create-patient/create-patient-response.dto';
import { GetPatientUseCase } from './get-patient/get-patient.use-case';
import { ListPatientsUseCase } from './get-patient/list-patients.use-case';
import { GetPatientResponseDTO } from './get-patient/get-patient-response.dto';
import { UpdatePatientUseCase } from './update-patient/update-patient.use-case';
import { UpdatePatientDTO } from './update-patient/update-patient.dto';
import { UpdatePatientResponseDTO } from './update-patient/update-patient-response.dto';
import { DeletePatientUseCase } from './delete-patient/delete-patient.use-case';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly createPatientUseCase: CreatePatientUseCase,
        private readonly getPatientUseCase: GetPatientUseCase,
        private readonly listPatientsUseCase: ListPatientsUseCase,
        private readonly updatePatientUseCase: UpdatePatientUseCase,
        private readonly deletePatientUseCase: DeletePatientUseCase,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreatePatientDTO): Promise<CreatePatientResponseDTO> {
        const entity = await this.createPatientUseCase.execute(dto.name, dto.phone, dto.age_profile, dto.email, dto.profile_photo);
        return CreatePatientResponseDTO.fromEntity(entity);
    }

    @Get()
    async list(): Promise<GetPatientResponseDTO[]> {
        const entities = await this.listPatientsUseCase.execute();
        return entities.map(GetPatientResponseDTO.fromEntity);
    }

    @Get(':id')
    async getById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<GetPatientResponseDTO> {
        const entity = await this.getPatientUseCase.execute(id);
        return GetPatientResponseDTO.fromEntity(entity);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdatePatientDTO,
    ): Promise<UpdatePatientResponseDTO> {
        const entity = await this.updatePatientUseCase.execute(id, dto);
        return UpdatePatientResponseDTO.fromEntity(entity);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.deletePatientUseCase.execute(id);
    }
}
