import { ServiceEntity } from "../../service.entity";

export interface IServiceRepository {
    create(service: Partial<ServiceEntity>): Promise<ServiceEntity>;
}

export const IServiceRepository = Symbol('IServiceRepository');
