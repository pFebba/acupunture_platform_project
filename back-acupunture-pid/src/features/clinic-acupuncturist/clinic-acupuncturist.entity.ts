import { Entity, PrimaryColumn, Index } from "typeorm";

@Entity('clinic_acupuncturist')
export class ClinicAcupuncturistEntity {
    @PrimaryColumn({ type: 'uuid' })
    clinic_id: string;

    @Index()
    @PrimaryColumn({ type: 'uuid' })
    acupuncturist_id: string;
}