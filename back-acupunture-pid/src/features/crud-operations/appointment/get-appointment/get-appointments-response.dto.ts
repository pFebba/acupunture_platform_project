import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { AppointmentStatus } from '../appointment-status.enum';

@Exclude()
export class GetAppointmentsResponseDTO {
    @Expose()
    appointment_id: string;

    @Expose()
    acupuncturist_id: string;

    @Expose()
    service_id: string;

    @Expose()
    patient_id: string;

    @Expose()
    clinic_id: string;

    @Expose()
    start_datetime: Date;

    @Expose()
    end_datetime: Date;

    @Expose()
    status: AppointmentStatus;

    static fromEntity(entity: any): GetAppointmentsResponseDTO {
        return plainToInstance(GetAppointmentsResponseDTO, entity, {
            excludeExtraneousValues: true,
        });
    }
}
