import { Injectable } from "@nestjs/common";
import { IServiceRepository } from "./interfaces/i-service-repository";
import { ServiceEntity } from "../service.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ServiceRepository implements IServiceRepository {
    constructor(
        @InjectRepository(ServiceEntity)
        private readonly typeOrmRepository: Repository<ServiceEntity>,
    ) {}

    create(service: Partial<ServiceEntity>): Promise<ServiceEntity> {
        const newService = this.typeOrmRepository.create(service);
        return this.typeOrmRepository.save(newService);
    }
}
