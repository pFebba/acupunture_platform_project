import { Inject, Injectable } from '@nestjs/common';
import { IAcupuncturistRepository } from '../repositories/interfaces/i-acupuncturist-repository';
import { AcupuncturistEntity } from '../../../domain/entities/acupuncturist.entity';

@Injectable()
export class ListAcupuncturistsUseCase {
  constructor(
    @Inject(IAcupuncturistRepository)
    private readonly acupuncturistRepository: IAcupuncturistRepository,
  ) {}

  async execute(): Promise<AcupuncturistEntity[]> {
    return this.acupuncturistRepository.findAll();
  }
}
