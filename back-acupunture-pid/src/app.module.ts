import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config'
import configuration from './common/config/configuration';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    ConfigModule.forRoot(
      {
        load:[configuration],
        isGlobal:true
      }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
