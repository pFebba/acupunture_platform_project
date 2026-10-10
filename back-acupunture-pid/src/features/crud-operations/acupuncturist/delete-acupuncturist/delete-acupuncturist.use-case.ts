import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcupuncturistRepository } from '../acupuncturist-repository';

@Injectable()
export class DeleteAcupuncturistUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturistRepository: AcupuncturistRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.acupuncturistRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Acupunturista não encontrado');
    }
  }
}
