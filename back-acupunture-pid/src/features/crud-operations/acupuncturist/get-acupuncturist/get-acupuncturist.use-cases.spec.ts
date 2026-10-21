import { NotFoundException } from '@nestjs/common';
import { GetAcupuncturistUseCase } from './get-acupuncturist.use-case';
import { GetAcupuncturistByCpfUseCase } from './get-acupuncturist-by-cpf.use-case';
import { GetAcupuncturistByEmailUseCase } from './get-acupuncturist-by-email.use-case';
import { GetAcupuncturistByEmailWithPasswordUseCase } from './get-acupuncturist-by-email-with-password.use-case';
import { ListAcupuncturistsUseCase } from './list-acupuncturists.use-case';
import { SearchAcupuncturistsByNameUseCase } from './search-acupuncturists-by-name.use-case';
import { ListAcupuncturistsResponseDto } from './list-acupuncturists-response.dto';

describe('Get acupuncturist use cases', () => {
  const acupuncturist = { id: 'a1', name: 'Ana', email: 'ana@mail.com', cpf: '52998224725' };
  let repository: Record<string, jest.Mock>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      findCredentials: jest.fn(),
      findAll: jest.fn(),
      findByName: jest.fn(),
    };
  });

  describe.each([
    ['GetAcupuncturistUseCase', GetAcupuncturistUseCase, 'findById', 'a1'],
    ['GetAcupuncturistByCpfUseCase', GetAcupuncturistByCpfUseCase, 'findByCpf', '52998224725'],
    ['GetAcupuncturistByEmailUseCase', GetAcupuncturistByEmailUseCase, 'findByEmail', 'ana@mail.com'],
    [
      'GetAcupuncturistByEmailWithPasswordUseCase',
      GetAcupuncturistByEmailWithPasswordUseCase,
      'findCredentials',
      'ana@mail.com',
    ],
  ])('%s', (_, UseCase: any, method: string, arg: string) => {
    it('retorna o acupunturista encontrado', async () => {
      repository[method].mockResolvedValue(acupuncturist);

      await expect(new UseCase(repository).execute(arg)).resolves.toBe(acupuncturist);
      expect(repository[method]).toHaveBeenCalledWith(arg);
    });

    it('lança NotFoundException quando não encontra', async () => {
      repository[method].mockResolvedValue(null);

      await expect(new UseCase(repository).execute(arg)).rejects.toThrow(
        new NotFoundException('Acupunturista não encontrado'),
      );
    });
  });

  describe('ListAcupuncturistsUseCase', () => {
    it('retorna todos os acupunturistas', async () => {
      repository.findAll.mockResolvedValue([acupuncturist]);

      await expect(new ListAcupuncturistsUseCase(repository as any).execute()).resolves.toEqual([acupuncturist]);
    });
  });

  describe('SearchAcupuncturistsByNameUseCase', () => {
    it('busca pelo nome', async () => {
      repository.findByName.mockResolvedValue([acupuncturist]);

      await expect(new SearchAcupuncturistsByNameUseCase(repository as any).execute('an')).resolves.toEqual([
        acupuncturist,
      ]);
      expect(repository.findByName).toHaveBeenCalledWith('an');
    });
  });
});

describe('ListAcupuncturistsResponseDto', () => {
  it('mapeia as entidades e informa o total', () => {
    const response = ListAcupuncturistsResponseDto.fromEntities([
      { id: 'a1', name: 'Ana', password_hash: 'x' },
      { id: 'a2', name: 'Bia', password_hash: 'y' },
    ]);

    expect(response.total).toBe(2);
    expect(response.data.map((d) => d.id)).toEqual(['a1', 'a2']);
    expect(response.data[0]).not.toHaveProperty('password_hash');
  });
});
