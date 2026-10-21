import { NotFoundException } from '@nestjs/common';
import { DeleteAcupuncturistUseCase } from './delete-acupuncturist.use-case';
import { DeleteAcupuncturistResponseDto } from './delete-acupuncturist-response.dto';

describe('DeleteAcupuncturistUseCase', () => {
  let repository: { delete: jest.Mock };
  let useCase: DeleteAcupuncturistUseCase;

  beforeEach(() => {
    repository = { delete: jest.fn() };
    useCase = new DeleteAcupuncturistUseCase(repository as any);
  });

  it('remove o acupunturista', async () => {
    repository.delete.mockResolvedValue(true);

    await expect(useCase.execute('a1')).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith('a1');
  });

  it('lança NotFoundException quando nada foi removido', async () => {
    repository.delete.mockResolvedValue(false);

    await expect(useCase.execute('a1')).rejects.toBeInstanceOf(NotFoundException);
  });
});

describe('DeleteAcupuncturistResponseDto', () => {
  it('cria a resposta com sucesso por padrão', () => {
    expect({ ...DeleteAcupuncturistResponseDto.create('ok') }).toEqual({ message: 'ok', success: true });
  });

  it('permite informar falha', () => {
    expect(DeleteAcupuncturistResponseDto.create('erro', false).success).toBe(false);
  });
});
