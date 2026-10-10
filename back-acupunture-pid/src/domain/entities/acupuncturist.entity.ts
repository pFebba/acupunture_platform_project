import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('acupuncturist')
export class AcupuncturistEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
    cpf: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false, select: false })
    password_hash: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;
}