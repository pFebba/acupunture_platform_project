import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingDaysEntity } from '../../../domain/entities/operating-days.entity';
import { OperatingDaysController } from './operating-days.controller';
import { OperatingDaysRepository } from './operating-days-repository';
import { CreateOperatingDaysUseCase } from './create-operating-days/create-operating-days.use-case';
import { GetOperatingDaysByClinicUseCase } from './get-operating-days/get-operating-days-by-clinic.use-case';
import { GetOperatingDayByClinicAndDayUseCase } from './get-operating-days/get-operating-day-by-clinic-and-day.use-case';
import { UpdateOperatingDaysUseCase } from './update-operating-days/update-operating-days.use-case';
import { DeleteOperatingDaysUseCase } from './delete-operating-days/delete-operating-days.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([OperatingDaysEntity])],
    controllers: [OperatingDaysController],
    providers: [
        OperatingDaysRepository,
        CreateOperatingDaysUseCase,
        GetOperatingDaysByClinicUseCase,
        GetOperatingDayByClinicAndDayUseCase,
        UpdateOperatingDaysUseCase,
        DeleteOperatingDaysUseCase,
    ],
})
export class OperatingDaysModule {}
