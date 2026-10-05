import { OperatingDaysEntity } from "../../operating-days.entity";

export interface IOperatingDaysRepository {
    create(operatingDays: Partial<OperatingDaysEntity>): Promise<OperatingDaysEntity>;
}

export const IOperatingDaysRepository = Symbol('IOperatingDaysRepository');