import { NotFoundException } from '@nestjs/common';
import { DeleteOperatingDaysUseCase } from './delete-operating-days.use-case';

describe('DeleteOperatingDaysUseCase', () => {
  it('remove o dia da clínica', async () => {
    const repository = { deleteByClinicAndDay: jest.fn().mockResolvedValue(true) };

    await expect(new DeleteOperatingDaysUseCase(repository as any).execute('cli-1', 2)).resolves.toBeUndefined();
    expect(repository.deleteByClinicAndDay).toHaveBeenCalledWith('cli-1', 2);
  });

  it('lança NotFoundException quando nada foi removido', async () => {
    const repository = { deleteByClinicAndDay: jest.fn().mockResolvedValue(false) };

    await expect(new DeleteOperatingDaysUseCase(repository as any).execute('cli-1', 2)).rejects.toThrow(
      new NotFoundException('Horário de funcionamento não encontrado'),
    );
  });
});
