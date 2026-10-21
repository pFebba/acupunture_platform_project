import { OperatingDaysController } from './operating-days.controller';

describe('OperatingDaysController', () => {
  const entity = {
    clinic_id: 'cli-1',
    day_of_week: 1,
    is_open: true,
    opening_time: '08:00',
    closing_time: '18:00',
    internal: 'x',
  };
  let create: { execute: jest.Mock };
  let byClinic: { execute: jest.Mock };
  let byClinicAndDay: { execute: jest.Mock };
  let update: { execute: jest.Mock };
  let remove: { execute: jest.Mock };
  let controller: OperatingDaysController;

  beforeEach(() => {
    create = { execute: jest.fn().mockResolvedValue(entity) };
    byClinic = { execute: jest.fn().mockResolvedValue([entity]) };
    byClinicAndDay = { execute: jest.fn().mockResolvedValue(entity) };
    update = { execute: jest.fn().mockResolvedValue(entity) };
    remove = { execute: jest.fn() };
    controller = new OperatingDaysController(
      create as any,
      byClinic as any,
      byClinicAndDay as any,
      update as any,
      remove as any,
    );
  });

  it('create repassa o dto e remove campos extras', async () => {
    const dto = { clinic_id: 'cli-1', day_of_week: 1, opening_time: '08:00', closing_time: '18:00' };

    const result = await controller.create(dto);

    expect(create.execute).toHaveBeenCalledWith(dto);
    expect(result).not.toHaveProperty('internal');
  });

  it('getByClinic lista os dias', async () => {
    const result = await controller.getByClinic('cli-1');

    expect(byClinic.execute).toHaveBeenCalledWith('cli-1');
    expect(result).toHaveLength(1);
  });

  it('getByClinicAndDay busca pelo dia', async () => {
    const result = await controller.getByClinicAndDay('cli-1', 1);

    expect(byClinicAndDay.execute).toHaveBeenCalledWith('cli-1', 1);
    expect(result.day_of_week).toBe(1);
  });

  it('update repassa clínica, dia e dto', async () => {
    await controller.update('cli-1', 1, { closing_time: '20:00' });

    expect(update.execute).toHaveBeenCalledWith('cli-1', 1, { closing_time: '20:00' });
  });

  it('delete repassa clínica e dia', async () => {
    await controller.delete('cli-1', 1);

    expect(remove.execute).toHaveBeenCalledWith('cli-1', 1);
  });
});
