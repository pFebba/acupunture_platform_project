import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '../../../domain/entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientRepository } from './patient-repository';
import { CreatePatientUseCase } from './create-patient/create-patient.use-case';
import { GetPatientUseCase } from './get-patient/get-patient.use-case';
import { ListPatientsUseCase } from './get-patient/list-patients.use-case';
import { UpdatePatientUseCase } from './update-patient/update-patient.use-case';
import { DeletePatientUseCase } from './delete-patient/delete-patient.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity])],
    controllers: [PatientController],
    providers: [
        PatientRepository,
        CreatePatientUseCase,
        GetPatientUseCase,
        ListPatientsUseCase,
        UpdatePatientUseCase,
        DeletePatientUseCase,
    ],
})
export class PatientModule {}
