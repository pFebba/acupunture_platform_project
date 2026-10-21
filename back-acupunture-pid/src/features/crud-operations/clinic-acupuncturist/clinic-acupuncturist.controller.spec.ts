import { ClinicAcupuncturistController } from './clinic-acupuncturist.controller';

describe('ClinicAcupuncturistController', () => {
  const entity = { clinic_id: 'cli-1', acupuncturist_id: 'acu-1', internal: 'x' };
  let create: { execute: jest.Mock };
  let byClinic: { execute: jest.Mock };
  let byAcupuncturist: { execute: jest.Mock };
  let remove: { execute: jest.Mock };
  let controller: ClinicAcupuncturistController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    byClinic = { execute: jest.fn().mockResolvedValue([entity]) };
    byAcupuncturist = { execute: jest.fn().mockResolvedValue([entity]) };
    remove = { execute: jest.fn() };
    controller = new ClinicAcupuncturistController(
      create as any,
      byClinic as any,
      byAcupuncturist as any,
      remove as any,
    );
  });

  it('create repassa os ids do dto', async () => {
    const result = await controller.create({ clinic_id: 'cli-1', acupuncturist_id: 'acu-1' } as any);

    expect(create.execute).toHaveBeenCalledWith('cli-1', 'acu-1');
    expect({ ...result }).toEqual({ clinic_id: 'cli-1', acupuncturist_id: 'acu-1' });
  });

  it('getByClinic mapeia os vínculos', async () => {
    const result = await controller.getByClinic('cli-1');

    expect(byClinic.execute).toHaveBeenCalledWith('cli-1');
    expect({ ...result[0] }).toEqual({ clinic_id: 'cli-1', acupuncturist_id: 'acu-1' });
  });

  it('getByAcupuncturist mapeia os vínculos', async () => {
    const result = await controller.getByAcupuncturist('acu-1');

    expect(byAcupuncturist.execute).toHaveBeenCalledWith('acu-1');
    expect(result).toHaveLength(1);
  });

  it('delete usa a chave composta', async () => {
    await controller.delete('cli-1', 'acu-1');

    expect(remove.execute).toHaveBeenCalledWith('cli-1', 'acu-1');
  });
});
