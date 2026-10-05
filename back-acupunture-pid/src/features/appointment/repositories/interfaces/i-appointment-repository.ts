import { AppointmentEntity } from "../../appointment.entity";

export interface IAppointmentRepository {
    create(appointment: Partial<AppointmentEntity>): Promise<AppointmentEntity>;
}

export const IAppointmentRepository = Symbol('IAppointmentRepository');