import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('clinic')
export class ClinicEntity {
    @PrimaryGeneratedColumn('uuid')
    clinic_id: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    logo?: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    city: string;

    @Column({ type: 'varchar', length: 8, nullable: false })
    zip_code: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;
}
