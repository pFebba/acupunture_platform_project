import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateOperatingDaysUseCase } from './create-operating-days.use-case';
import { CreateOperatingDaysDTO } from './create-operating-days.dto';

describe('CreateOperatingDaysUseCase', () => {
  let repository: { create: jest.Mock };
  let useCase: CreateOperatingDaysUseCase;

  beforeEach(() => {
    repository = { create: jest.fn().mockImplementation(async (data) => data) };
    useCase = new CreateOperatingDaysUseCase(repository as any);
  });

  it('cria um dia aberto com horários válidos', async () => {
    const dto = { clinic_id: 'cli-1', day_of_week: 1, is_open: true, opening_time: '08:00', closing_time: '18:00' };

    await expect(useCase.execute(dto)).resolves.toEqual(dto);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('considera o dia aberto quando is_open não é informado', async () => {
    await useCase.execute({ clinic_id: 'cli-1', day_of_week: 1, opening_time: '08:00', closing_time: '18:00' });

    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({ is_open: true }));
  });

  it('cria um dia fechado sem horários', async () => {
    await useCase.execute({ clinic_id: 'cli-1', day_of_week: 0, is_open: false });

    expect(repository.create).toHaveBeenCalledWith({
      clinic_id: 'cli-1',
      day_of_week: 0,
      is_open: false,
      opening_time: undefined,
      closing_time: undefined,
    });
  });

  it.each([
    ['sem horário de abertura', { closing_time: '18:00' }],
    ['sem horário de fechamento', { opening_time: '08:00' }],
    ['com fechamento igual à abertura', { opening_time: '08:00', closing_time: '08:00' }],
    ['com fechamento antes da abertura', { opening_time: '18:00', closing_time: '08:00' }],
  ])('lança BadRequestException para dia aberto %s', async (_, times) => {
    await expect(useCase.execute({ clinic_id: 'cli-1', day_of_week: 1, ...times })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(repository.create).not.toHaveBeenCalled();
  });
});

describe('CreateOperatingDaysDTO', () => {
  const payload = { clinic_id: '3f2504e0-4f89-41d3-9a0c-0305e82c3301', day_of_week: 3, opening_time: '08:00' };
  const invalidProperties = (override: object) =>
    validateSync(plainToInstance(CreateOperatingDaysDTO, { ...payload, ...override })).map((e) => e.property);

  it('aceita um payload válido', () => {
    expect(invalidProperties({ closing_time: '18:30:00' })).toEqual([]);
  });

  it.each([
    ['day_of_week', { day_of_week: 7 }],
    ['day_of_week', { day_of_week: -1 }],
    ['day_of_week', { day_of_week: 1.5 }],
    ['opening_time', { opening_time: '25:00' }],
    ['clinic_id', { clinic_id: 'abc' }],
    ['is_open', { is_open: 'sim' }],
  ])('rejeita %s inválido', (property, override) => {
    expect(invalidProperties(override)).toEqual([property]);
  });
});
