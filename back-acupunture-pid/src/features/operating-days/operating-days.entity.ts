import { Entity, PrimaryColumn, Column, Check } from "typeorm";

@Entity('operating_days')
@Check('day_of_week BETWEEN 0 AND 6')
@Check('(is_open = false) OR (opening_time IS NOT NULL AND closing_time IS NOT NULL AND closing_time > opening_time)')
export class OperatingDaysEntity {
    @PrimaryColumn({ type: 'uuid' })
    clinic_id: string;

    // 0 = Sunday ... 6 = Saturday
    @PrimaryColumn({ type: 'smallint' })
    day_of_week: number;

    @Column({ type: 'boolean', nullable: false, default: true })
    is_open: boolean;

    @Column({ type: 'time', nullable: true })
    opening_time?: string;

    @Column({ type: 'time', nullable: true })
    closing_time?: string;
}