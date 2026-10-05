import { Module, DynamicModule } from "@nestjs/common";
import { dbConfig } from "../config/env/db_env.config";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
    const config = dbConfig();

    // Se estiver desativado, retorna o módulo sem importar o TypeORM
    if (!config.enabled) {
      console.log('⚠️ Conexão com o banco de dados desativada (DATABASE_ENABLED=false).');
      return {
        module: DatabaseModule,
        imports: [],
        providers: [],
        exports: [],
      };
    }

    // Se estiver ativado, inicializa a conexão com o PostgreSQL normalmente
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: config.host,
            port: config.port,
            username: config.user,
            password: config.password,
            database: config.database,
            autoLoadEntities: true,
          }),
        }),
      ],
    };
  }
}
