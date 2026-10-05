import { Injectable } from "@nestjs/common";
import { IOperatingDaysRepository } from "./interfaces/i-operating-days-repository";
import { OperatingDaysEntity } from "../operating-days.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OperatingDaysRepository implements IOperatingDaysRepository {
    constructor(
        @InjectRepository(OperatingDaysEntity)
        private readonly typeOrmRepository: Repository<OperatingDaysEntity>,
    ) {}

    create(operatingDays: Partial<OperatingDaysEntity>): Promise<OperatingDaysEntity> {
        const newOperatingDays = this.typeOrmRepository.create(operatingDays);
        return this.typeOrmRepository.save(newOperatingDays);
    }
}