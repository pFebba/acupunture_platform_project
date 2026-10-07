import { Module, DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
      return{
        module: DatabaseModule,
        imports:[
          TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              const isEnabled = configService.get<boolean>('POSTGRE_ENABLED');

              if(isEnabled){
                return {}
              }
              
              return {
                type: 'postgres',
                host: configService.get<string>('POSTGRE_DB_HOST'),
                port: Number(configService.get<string>('POSTGRE_DB_PORT')),
                database: configService.get<string>('POSTGRE_DB_NAME'),
                username: configService.get<string>('POSTGRE_DB_USER'),
                password: configService.get<string>('POSTGRE_DB_PASSWORD'),
              }
            },
          })
        ]
      }
  }
}
