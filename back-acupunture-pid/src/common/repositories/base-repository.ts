import { Repository } from 'typeorm';

export interface IBaseRepository<T> {
  create(data: any): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  update(id: string | number, data: any): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
}

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly typeOrmRepository: Repository<T>) {}

  async create(data: any): Promise<T> {
    const entity = this.typeOrmRepository.create(data);
    return this.typeOrmRepository.save(entity) as any;
  }

  async findAll(): Promise<T[]> {
    return this.typeOrmRepository.find() as any;
  }

  async findById(id: string | number): Promise<T | null> {
    return this.typeOrmRepository.findOne({
      where: { id } as any,
    } as any);
  }

  async update(id: string | number, data: any): Promise<T | null> {
    await this.typeOrmRepository.update(id as any, data as any);
    return this.findById(id);
  }

  async delete(id: string | number): Promise<boolean> {
    const result = await this.typeOrmRepository.delete(id as any);
    return (result.affected ?? 0) > 0;
  }

  protected getRepository(): Repository<T> {
    return this.typeOrmRepository;
  }
}
