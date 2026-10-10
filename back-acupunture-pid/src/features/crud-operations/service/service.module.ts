import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../../../domain/entities/service.entity';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service-repository';
import { CreateServiceUseCase } from './create-service/create-service.use-case';
import { GetServiceUseCase } from './get-service/get-service.use-case';
import { ListServicesUseCase } from './get-service/list-services.use-case';
import { UpdateServiceUseCase } from './update-service/update-service.use-case';
import { DeleteServiceUseCase } from './delete-service/delete-service.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ServiceEntity])],
    controllers: [ServiceController],
    providers: [
        ServiceRepository,
        CreateServiceUseCase,
        GetServiceUseCase,
        ListServicesUseCase,
        UpdateServiceUseCase,
        DeleteServiceUseCase,
    ],
})
export class ServiceModule {}
