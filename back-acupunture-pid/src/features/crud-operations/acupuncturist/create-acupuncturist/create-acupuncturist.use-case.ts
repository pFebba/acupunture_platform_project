import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { AcupuncturistRepository } from '../acupuncturist-repository';
import { AcupuncturistEntity } from '../../../../common/domain/entities/acupuncturist.entity';
import { CreateAcupuncturistDTO } from './create-acupuncturist.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class CreateAcupuncturistUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturisRepository: AcupuncturistRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(dto: CreateAcupuncturistDTO): Promise<AcupuncturistEntity> {
    const userExists = await this.acupuncturisRepository.findByEmail(dto.email);
    if (userExists) {
      throw new ConflictException('Usuário já cadastrado com este e-mail');
    }

    const password_hash = await this.passwordHasher.hash(dto.password)

    return await this.acupuncturisRepository.create({
      name: dto.name,
      cpf: dto.cpf,
      email: dto.email,
      phone: dto.phone,
      password_hash,
    });
  }
}
