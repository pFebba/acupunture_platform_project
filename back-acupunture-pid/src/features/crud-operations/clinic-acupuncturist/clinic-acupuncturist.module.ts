import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicAcupuncturistEntity } from '../../../domain/entities/clinic-acupuncturist.entity';
import { ClinicAcupuncturistController } from './clinic-acupuncturist.controller';
import { ClinicAcupuncturistRepository } from './clinic-acupuncturist-repository';
import { CreateClinicAcupuncturistUseCase } from './create-clinic-acupuncturist/create-clinic-acupuncturist.use-case';
import { GetClinicAcupuncturistByClinicUseCase } from './get-clinic-acupuncturist/get-clinic-acupuncturist-by-clinic.use-case';
import { GetClinicAcupuncturistByAcupuncturistUseCase } from './get-clinic-acupuncturist/get-clinic-acupuncturist-by-acupuncturist.use-case';
import { DeleteClinicAcupuncturistUseCase } from './delete-clinic-acupuncturist/delete-clinic-acupuncturist.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ClinicAcupuncturistEntity])],
    controllers: [ClinicAcupuncturistController],
    providers: [
        ClinicAcupuncturistRepository,
        CreateClinicAcupuncturistUseCase,
        GetClinicAcupuncturistByClinicUseCase,
        GetClinicAcupuncturistByAcupuncturistUseCase,
        DeleteClinicAcupuncturistUseCase,
    ],
})
export class ClinicAcupuncturistModule {}
