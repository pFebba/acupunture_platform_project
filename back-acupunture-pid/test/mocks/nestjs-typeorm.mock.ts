// Stub de @nestjs/typeorm para testes unitários.
// O pacote real é ESM puro (usa import.meta) e não roda no Jest em modo CommonJS.
export const InjectRepository = (): ParameterDecorator => () => undefined;

export const getRepositoryToken = (entity: { name?: string }) => `${entity?.name}Repository`;

export class TypeOrmModule {
  static forFeature() {
    return { module: TypeOrmModule };
  }

  static forRoot() {
    return { module: TypeOrmModule };
  }

  static forRootAsync() {
    return { module: TypeOrmModule };
  }
}
