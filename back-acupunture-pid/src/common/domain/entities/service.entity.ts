import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('service')
export class ServiceEntity {
    @PrimaryGeneratedColumn('uuid')
    service_id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    type: string;
}
