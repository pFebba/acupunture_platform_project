import { Injectable } from "@nestjs/common";
import { IAppointmentRepository } from "./interfaces/i-appointment-repository";
import { AppointmentEntity } from "../appointment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
    constructor(
        @InjectRepository(AppointmentEntity)
        private readonly typeOrmRepository: Repository<AppointmentEntity>,
    ) {}

    create(appointment: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
        const newAppointment = this.typeOrmRepository.create(appointment);
        return this.typeOrmRepository.save(newAppointment);
    }
}