import { Entity, PrimaryGeneratedColumn, Column, Index, Check } from "typeorm";
import { AppointmentStatus } from "../enums/appointment-status.enum";

@Entity('appointment')
@Index(['acupuncturist_id', 'start_datetime'])
@Index(['clinic_id', 'start_datetime'])
@Check('end_datetime > start_datetime')
export class AppointmentEntity {
    @PrimaryGeneratedColumn('uuid')
    appointment_id: string;

    @Column({ type: 'uuid', nullable: false })
    acupuncturist_id: string;

    @Index()
    @Column({ type: 'uuid', nullable: false })
    service_id: string;

    @Index()
    @Column({ type: 'uuid', nullable: false })
    patient_id: string;

    @Column({ type: 'uuid', nullable: false })
    clinic_id: string;

    @Column({ type: 'timestamptz', nullable: false })
    start_datetime: Date;

    @Column({ type: 'timestamptz', nullable: false })
    end_datetime: Date;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        enumName: 'appointment_status',
        default: AppointmentStatus.SCHEDULED,
        nullable: false,
    })
    status: AppointmentStatus;
}