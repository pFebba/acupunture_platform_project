import { Inject, Injectable } from '@nestjs/common';
import { AcupuncturistRepository } from '../acupuncturist-repository';
import { AcupuncturistEntity } from '../../../../domain/entities/acupuncturist.entity';

@Injectable()
export class SearchAcupuncturistsByNameUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturistRepository: AcupuncturistRepository,
  ) {}

  async execute(name: string): Promise<AcupuncturistEntity[]> {
    return this.acupuncturistRepository.findByName(name);
  }
}
