import { Entity, PrimaryColumn, Column, Index, Check } from "typeorm";

@Entity('clinic_service_acupuncturist')
@Check('price >= 0')
export class ClinicServiceAcupuncturistEntity {
    @PrimaryColumn({ type: 'uuid' })
    clinic_id: string;

    @Index()
    @PrimaryColumn({ type: 'uuid' })
    service_id: string;

    @Index()
    @PrimaryColumn({ type: 'uuid' })
    acupuncturist_id: string;

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        transformer: {
            to: (value?: number) => value,
            from: (value?: string | null) => (value == null ? value : parseFloat(value)),
        },
    })
    price: number;
}