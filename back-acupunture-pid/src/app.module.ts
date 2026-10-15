import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './common/config/configuration';
import { AcupuncturistModule } from './features/crud-operations/acupuncturist/acupuncturist.module';
import { PatientModule } from './features/crud-operations/patient/patient.module';
import { ClinicModule } from './features/crud-operations/clinic/clinic.module';
import { ServiceModule } from './features/crud-operations/service/service.module';
import { OperatingDaysModule } from './features/crud-operations/operating-days/operating-days.module';
import { ClinicAcupuncturistModule } from './features/crud-operations/clinic-acupuncturist/clinic-acupuncturist.module';
import { ClinicServiceAcupuncturistModule } from './features/crud-operations/clinic-service-acupuncturist/clinic-service-acupuncturist.module';
import { AppointmentModule } from './features/crud-operations/appointment/appointment.module';
import { MessageModule } from './features/crud-operations/message/message.module';
import { dbContext } from './common/database/dbContext';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AcupuncturistModule,
    PatientModule,
    ClinicModule,
    ServiceModule,
    OperatingDaysModule,
    ClinicAcupuncturistModule,
    ClinicServiceAcupuncturistModule,
    AppointmentModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
