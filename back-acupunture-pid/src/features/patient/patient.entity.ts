import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('patient')
export class PatientEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    age_profile?: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;

    @Column({ type: 'text', nullable: true })
    profile_photo?: string;
}
