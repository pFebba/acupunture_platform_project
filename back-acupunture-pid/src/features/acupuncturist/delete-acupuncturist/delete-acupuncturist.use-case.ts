import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAcupuncturistRepository } from '../repositories/interfaces/i-acupuncturist-repository';

@Injectable()
export class DeleteAcupuncturistUseCase {
  constructor(
    @Inject(IAcupuncturistRepository)
    private readonly acupuncturistRepository: IAcupuncturistRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.acupuncturistRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Acupunturista não encontrado');
    }
  }
}
