import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from '../../../domain/entities/clinic.entity';
import { ClinicController } from './clinic.controller';
import { ClinicRepository } from './clinic-repository';
import { CreateClinicUseCase } from './create-clinic/create-clinic.use-case';
import { GetClinicUseCase } from './get-clinic/get-clinic.use-case';
import { ListClinicsUseCase } from './get-clinic/list-clinics.use-case';
import { UpdateClinicUseCase } from './update-clinic/update-clinic.use-case';
import { DeleteClinicUseCase } from './delete-clinic/delete-clinic.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ClinicEntity])],
    controllers: [ClinicController],
    providers: [
        ClinicRepository,
        CreateClinicUseCase,
        GetClinicUseCase,
        ListClinicsUseCase,
        UpdateClinicUseCase,
        DeleteClinicUseCase,
    ],
})
export class ClinicModule {}
