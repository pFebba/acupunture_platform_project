import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IAcupuncturistRepository } from '../repositories/interfaces/i-acupuncturist-repository';
import { AcupuncturistEntity } from '../acupuncturist.entity';


@Injectable()
export class CreateAcupuncturistUseCase {
  constructor(
    @Inject(IAcupuncturistRepository)
    private readonly userRepository: IAcupuncturistRepository,
  ) {}

  async execute(name: string, email: string): Promise<AcupuncturistEntity> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Usuário já cadastrado com este e-mail');
    }

    return await this.userRepository.create({ name, email });
  }
}
