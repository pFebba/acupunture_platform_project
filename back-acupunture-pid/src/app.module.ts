import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './common/config/configuration';
import { AcupuncturistModule } from './features/acupuncturist/acupuncturist.module';
import { dbContext } from './common/database/dbContext';

const dbInstance = dbContext.getDbContext()

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        dbInstance.getDbConfig(configService),
    }),
    AcupuncturistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}