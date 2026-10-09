import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ListAcupuncturistsUseCase } from './list-acupuncturists/list-acupuncturists.use-case';
import { GetAcupuncturistUseCase } from './get-acupuncturist/get-acupuncturist.use-case';
import { UpdateAcupuncturistUseCase } from './update-acupuncturist/update-acupuncturist.use-case';
import { DeleteAcupuncturistUseCase } from './delete-acupuncturist/delete-acupuncturist.use-case';
import { UpdateAcupuncturistDTO } from './update-acupuncturist/update-acupuncturist.dto';
import { CreateAcupuncturistUseCase } from './create-acupuncturist/create-acupuncturist.use-case';
import { CreateAcupuncturistDTO } from './create-acupuncturist/create-acupuncturist.dto';
import { CreateAcupuncturistResponseDto } from './create-acupuncturist/create-acupuncturist-response.dto';
import { UpdateAcupuncturistResponseDto } from './update-acupuncturist/update-acupuncturist-response.dto';
import { GetAcupuncturistResponseDto } from './get-acupuncturist/get-acupuncturist-response.dto';

@Controller('acupuncturist')
export class AcupuncturistController {
  constructor(
    private readonly createUseCase: CreateAcupuncturistUseCase,
    private readonly listUseCase: ListAcupuncturistsUseCase,
    private readonly getUseCase: GetAcupuncturistUseCase,
    private readonly updateUseCase: UpdateAcupuncturistUseCase,
    private readonly deleteUseCase: DeleteAcupuncturistUseCase,
  ) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateAcupuncturistDTO): Promise<CreateAcupuncturistResponseDto> {
      const entity = await this.createUseCase.execute(dto);
      return CreateAcupuncturistResponseDto.fromEntity(entity)
  }

  @Get()
  async list(): Promise<GetAcupuncturistResponseDto[]> {
    const entities = await this.listUseCase.execute();
    return entities.map((entity) => GetAcupuncturistResponseDto.fromEntity(entity));
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<GetAcupuncturistResponseDto> {
    const entity = await this.getUseCase.execute(id);
    return GetAcupuncturistResponseDto.fromEntity(entity);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAcupuncturistDTO,
  ): Promise<UpdateAcupuncturistResponseDto> {
    const entity = await this.updateUseCase.execute(id, dto);
    return UpdateAcupuncturistResponseDto.fromEntity(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }
}
