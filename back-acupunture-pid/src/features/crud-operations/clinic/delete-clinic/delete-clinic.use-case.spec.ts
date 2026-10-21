import { NotFoundException } from '@nestjs/common';
import { DeleteClinicUseCase } from './delete-clinic.use-case';

describe('DeleteClinicUseCase', () => {
  it('remove a clínica', async () => {
    const repository = { delete: jest.fn().mockResolvedValue(true) };

    await expect(new DeleteClinicUseCase(repository as any).execute('cli-1')).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith('cli-1');
  });

  it('lança NotFoundException quando nada foi removido', async () => {
    const repository = { delete: jest.fn().mockResolvedValue(false) };

    await expect(new DeleteClinicUseCase(repository as any).execute('cli-1')).rejects.toThrow(
      new NotFoundException('Clínica não encontrada'),
    );
  });
});
