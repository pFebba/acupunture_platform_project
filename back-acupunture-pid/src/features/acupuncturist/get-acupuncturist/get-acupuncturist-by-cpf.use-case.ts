import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcupuncturistRepository } from '../acupuncturist-repository';
import { AcupuncturistEntity } from '../../../domain/entities/acupuncturist.entity';

@Injectable()
export class GetAcupuncturistByCpfUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturistRepository: AcupuncturistRepository,
  ) {}

  async execute(cpf: string): Promise<AcupuncturistEntity> {
    const acupuncturist = await this.acupuncturistRepository.findByCpf(cpf);
    if (!acupuncturist) {
      throw new NotFoundException('Acupunturista não encontrado');
    }
    return acupuncturist;
  }
}
