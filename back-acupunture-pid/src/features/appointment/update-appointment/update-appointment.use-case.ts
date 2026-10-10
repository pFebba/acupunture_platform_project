import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { AppointmentRepository } from "../appointment-repository";
import { AppointmentEntity } from "src/domain/entities/appointment.entity";
import { UpdateAppointmentDTO } from "./update-appointment.dto";

export class UpdateAppointmentUseCase{
    constructor(
        @Inject(AppointmentRepository)
        private readonly appointmentRepository: AppointmentRepository
    ) {}

    async execute(id: string, dto: UpdateAppointmentDTO ): Promise<AppointmentEntity> {
        const appointment = await this.appointmentRepository.findById(id);
        if(!appointment){
            throw new NotFoundException('Acupunturista não encontrado');
        }

        if (dto.end_datetime <= dto.start_datetime) {
            throw new BadRequestException('A data de fim deve ser posterior à data de início');
        }

        const data: Partial<AppointmentEntity> = {}
        if(dto.start_datetime !== undefined) data.start_datetime = new Date(dto.start_datetime)
        if(dto.end_datetime !== undefined) data.end_datetime = new Date(dto.end_datetime)
        if(dto.status !== undefined) data.status = dto.status.toLowerCase() as AppointmentEntity["status"];

        const updated = await this.appointmentRepository.update(id, data);
        return updated ?? appointment;
    }
}