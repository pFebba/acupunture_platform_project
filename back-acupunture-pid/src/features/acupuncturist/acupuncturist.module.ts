import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcupuncturistEntity } from '../../domain/entities/acupuncturist.entity';
import { AcupuncturistController } from './acupuncturist.controller';
import { CreateAcupuncturistUseCase } from './create-acupuncturist/create-acupuncturist.use-case';
import { ListAcupuncturistsUseCase } from './get-acupuncturist/list-acupuncturists.use-case';
import { GetAcupuncturistUseCase } from './get-acupuncturist/get-acupuncturist.use-case';
import { GetAcupuncturistByCpfUseCase } from './get-acupuncturist/get-acupuncturist-by-cpf.use-case';
import { GetAcupuncturistByEmailUseCase } from './get-acupuncturist/get-acupuncturist-by-email.use-case';
import { GetAcupuncturistByEmailWithPasswordUseCase } from './get-acupuncturist/get-acupuncturist-by-email-with-password.use-case';
import { SearchAcupuncturistsByNameUseCase } from './get-acupuncturist/search-acupuncturists-by-name.use-case';
import { UpdateAcupuncturistUseCase } from './update-acupuncturist/update-acupuncturist.use-case';
import { DeleteAcupuncturistUseCase } from './delete-acupuncturist/delete-acupuncturist.use-case';
import { AcupuncturistRepository } from './acupuncturist-repository';


@Module({
  imports: [TypeOrmModule.forFeature([AcupuncturistEntity])],
  controllers: [AcupuncturistController],
  providers: [
    CreateAcupuncturistUseCase,
    ListAcupuncturistsUseCase,
    GetAcupuncturistUseCase,
    GetAcupuncturistByCpfUseCase,
    GetAcupuncturistByEmailUseCase,
    GetAcupuncturistByEmailWithPasswordUseCase,
    SearchAcupuncturistsByNameUseCase,
    UpdateAcupuncturistUseCase,
    DeleteAcupuncturistUseCase,
    AcupuncturistRepository,
  ],
  exports: [],
})
export class AcupuncturistModule {}
