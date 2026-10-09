import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AcupuncturistRepository } from '../acupuncturist-repository';
import { AcupuncturistEntity } from '../../../domain/entities/acupuncturist.entity';
import { UpdateAcupuncturistDTO } from './update-acupuncturist.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UpdateAcupuncturistUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturistRepository: AcupuncturistRepository,
  ) {}

  async execute(id: string, dto: UpdateAcupuncturistDTO): Promise<AcupuncturistEntity> {
    const acupuncturist = await this.acupuncturistRepository.findById(id);
    if (!acupuncturist) {
      throw new NotFoundException('Acupunturista não encontrado');
    }

    if (dto.email && dto.email !== acupuncturist.email) {
      const emailInUse = await this.acupuncturistRepository.findByEmail(dto.email);
      if (emailInUse) {
        throw new ConflictException('Usuário já cadastrado com este e-mail');
      }
    }

    if (dto.cpf && dto.cpf !== acupuncturist.cpf) {
      const cpfInUse = await this.acupuncturistRepository.findByCpf(dto.cpf);
      if (cpfInUse) {
        throw new ConflictException('Usuário já cadastrado com este CPF');
      }
    }

    const data: Partial<AcupuncturistEntity> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.cpf !== undefined) data.cpf = dto.cpf;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.password) data.password_hash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    if (Object.keys(data).length === 0) {
      return acupuncturist;
    }

    const updated = await this.acupuncturistRepository.update(id, data);
    return updated ?? acupuncturist;
  }
}
