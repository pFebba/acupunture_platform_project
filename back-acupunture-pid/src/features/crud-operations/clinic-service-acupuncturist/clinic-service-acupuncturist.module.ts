import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicServiceAcupuncturistEntity } from '../../../domain/entities/clinic-service-acupuncturist.entity';
import { ClinicServiceAcupuncturistController } from './clinic-service-acupuncturist.controller';
import { ClinicServiceAcupuncturistRepository } from './clinic-service-acupuncturist-repository';
import { CreateClinicServiceAcupuncturistUseCase } from './create-clinic-service-acupuncturist/create-clinic-service-acupuncturist.use-case';
import { GetClinicServiceAcupuncturistUseCase } from './get-clinic-service-acupuncturist/get-clinic-service-acupuncturist.use-case';
import { UpdateClinicServiceAcupuncturistUseCase } from './update-clinic-service-acupuncturist/update-clinic-service-acupuncturist.use-case';
import { DeleteClinicServiceAcupuncturistUseCase } from './delete-clinic-service-acupuncturist/delete-clinic-service-acupuncturist.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ClinicServiceAcupuncturistEntity])],
    controllers: [ClinicServiceAcupuncturistController],
    providers: [
        ClinicServiceAcupuncturistRepository,
        CreateClinicServiceAcupuncturistUseCase,
        GetClinicServiceAcupuncturistUseCase,
        UpdateClinicServiceAcupuncturistUseCase,
        DeleteClinicServiceAcupuncturistUseCase,
    ],
})
export class ClinicServiceAcupuncturistModule {}
