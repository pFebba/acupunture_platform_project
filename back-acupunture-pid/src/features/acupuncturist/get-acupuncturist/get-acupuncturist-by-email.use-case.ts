import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcupuncturistRepository } from '../acupuncturist-repository';
import { AcupuncturistEntity } from '../../../domain/entities/acupuncturist.entity';

@Injectable()
export class GetAcupuncturistByEmailUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturistRepository: AcupuncturistRepository,
  ) {}

  async execute(email: string): Promise<AcupuncturistEntity> {
    const acupuncturist = await this.acupuncturistRepository.findByEmail(email);
    if (!acupuncturist) {
      throw new NotFoundException('Acupunturista não encontrado');
    }
    return acupuncturist;
  }
}
