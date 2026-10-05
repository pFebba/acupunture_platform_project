import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateAcupuncturistUseCase } from '../use-cases/create-acupuncturist.use-case';
import { CreateAcupuncturistDTO } from '../dto/http/create-acupuncturist.dto';
import { CreateAcupuncturistResponseDto } from '../dto/response/create-acupuncturist-response.dto';

@Controller('acupuncturist')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateAcupuncturistUseCase) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAcupuncturistDTO): Promise<CreateAcupuncturistResponseDto> {
    const acupuncturistEntity = await this.createUserUseCase.execute(dto.name, dto.email);
    return CreateAcupuncturistResponseDto.fromEntity(acupuncturistEntity);
  }
}