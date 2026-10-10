import {
  BadRequestException,
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
  Query,
} from '@nestjs/common';
import { ListAcupuncturistsUseCase } from './get-acupuncturist/list-acupuncturists.use-case';
import { GetAcupuncturistUseCase } from './get-acupuncturist/get-acupuncturist.use-case';
import { GetAcupuncturistByCpfUseCase } from './get-acupuncturist/get-acupuncturist-by-cpf.use-case';
import { GetAcupuncturistByEmailUseCase } from './get-acupuncturist/get-acupuncturist-by-email.use-case';
import { GetAcupuncturistByEmailWithPasswordUseCase } from './get-acupuncturist/get-acupuncturist-by-email-with-password.use-case';
import { SearchAcupuncturistsByNameUseCase } from './get-acupuncturist/search-acupuncturists-by-name.use-case';
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
    private readonly getByCpfUseCase: GetAcupuncturistByCpfUseCase,
    private readonly getByEmailUseCase: GetAcupuncturistByEmailUseCase,
    private readonly getByEmailWithPasswordUseCase: GetAcupuncturistByEmailWithPasswordUseCase,
    private readonly searchByNameUseCase: SearchAcupuncturistsByNameUseCase,
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

  @Get('search')
  async searchByName(@Query('name') name: string): Promise<GetAcupuncturistResponseDto[]> {
    if (!name?.trim()) throw new BadRequestException('O parâmetro name é obrigatório');
    const entities = await this.searchByNameUseCase.execute(name);
    return entities.map((entity) => GetAcupuncturistResponseDto.fromEntity(entity));
  }

  @Get('cpf/:cpf')
  async getByCpf(@Param('cpf') cpf: string): Promise<GetAcupuncturistResponseDto> {
    const entity = await this.getByCpfUseCase.execute(cpf);
    return GetAcupuncturistResponseDto.fromEntity(entity);
  }

  @Get('email/:email')
  async getByEmail(@Param('email') email: string): Promise<GetAcupuncturistResponseDto> {
    const entity = await this.getByEmailUseCase.execute(email);
    return GetAcupuncturistResponseDto.fromEntity(entity);
  }

  @Get('email-with-password')
  async getByEmailWithPassword(@Query('email') email: string): Promise<GetAcupuncturistResponseDto> {
    if (!email?.trim()) throw new BadRequestException('O parâmetro email é obrigatório');
    const entity = await this.getByEmailWithPasswordUseCase.execute(email);
    return GetAcupuncturistResponseDto.fromEntity(entity);
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
