import { Inject, Injectable } from '@nestjs/common';
import { AcupuncturistRepository } from '../acupuncturist-repository';
import { AcupuncturistEntity } from '../../../../domain/entities/acupuncturist.entity';

@Injectable()
export class ListAcupuncturistsUseCase {
  constructor(
    @Inject(AcupuncturistRepository)
    private readonly acupuncturistRepository: AcupuncturistRepository,
  ) {}

  async execute(): Promise<AcupuncturistEntity[]> {
    return this.acupuncturistRepository.findAll();
  }
}
