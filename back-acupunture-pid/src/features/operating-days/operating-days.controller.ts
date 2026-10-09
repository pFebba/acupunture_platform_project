import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOperatingDaysUseCase } from './create-operating-days/create-operating-days.use-case';
import { CreateOperatingDaysDTO } from './create-operating-days/create-operating-days.dto';
import { CreateOperatingDaysResponseDTO } from './create-operating-days/create-operating-days-response.dto';

@Controller('operating-days')
export class OperatingDaysController {
    constructor(private readonly createOperatingDaysUseCase: CreateOperatingDaysUseCase) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateOperatingDaysDTO): Promise<CreateOperatingDaysResponseDTO> {
        const entity = await this.createOperatingDaysUseCase.execute(dto);
        return CreateOperatingDaysResponseDTO.fromEntity(entity);
    }
}
