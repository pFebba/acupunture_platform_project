import { CreateClinicUseCase } from './create-clinic.use-case';

describe('CreateClinicUseCase', () => {
  it('cria a clínica com os dados informados', async () => {
    const created = { clinic_id: 'cli-1' };
    const repository = { create: jest.fn().mockResolvedValue(created) };
    const useCase = new CreateClinicUseCase(repository as any);

    await expect(useCase.execute('Clínica Zen', 'São Paulo', '01000-000', 'Rua A, 1', 'logo.png')).resolves.toBe(
      created,
    );
    expect(repository.create).toHaveBeenCalledWith({
      name: 'Clínica Zen',
      city: 'São Paulo',
      zip_code: '01000-000',
      address: 'Rua A, 1',
      logo: 'logo.png',
    });
  });

  it('aceita clínica sem logo', async () => {
    const repository = { create: jest.fn() };

    await new CreateClinicUseCase(repository as any).execute('Clínica Zen', 'SP', '01000-000', 'Rua A, 1');

    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({ logo: undefined }));
  });
});
