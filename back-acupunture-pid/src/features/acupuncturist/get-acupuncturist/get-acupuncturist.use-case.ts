import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAcupuncturistRepository } from '../repositories/interfaces/i-acupuncturist-repository';
import { AcupuncturistEntity } from '../../../domain/entities/acupuncturist.entity';

@Injectable()
export class GetAcupuncturistUseCase {
  constructor(
    @Inject(IAcupuncturistRepository)
    private readonly acupuncturistRepository: IAcupuncturistRepository,
  ) {}

  async execute(id: string): Promise<AcupuncturistEntity> {
    const acupuncturist = await this.acupuncturistRepository.findById(id);
    if (!acupuncturist) {
      throw new NotFoundException('Acupunturista não encontrado');
    }
    return acupuncturist;
  }
}
