import { Module, DynamicModule } from '@nestjs/common';
import { SessionAuth } from './session-auth.provider.js';
import { AcupuncturistModule } from 'src/features/crud-operations/acupuncturist/acupuncturist.module.js';
import { AuthController } from '../api/auth.controller.js';
import { Auth } from './auth.js';
import { ConfigService } from '@nestjs/config';
import { AuthenticationModule } from '@nestjs/authentication';


/*
@Module({
  controllers:[AuthController],
  imports: [AcupuncturistModule],
  providers: [SessionAuth, Auth],
})
export class AuthModule {}
*/

@Module({})
export class AuthModule {
  static register(): DynamicModule{
    const isAuthEnabled = process.env.AUTH_ENABLED === 'true';
    if (!isAuthEnabled ) {
    return{
      module: AuthModule,
      controllers:[],
      imports: [],
      providers: [],
    }
  }
  return{
    module: AuthModule,
    controllers:[AuthController],
    imports: [
      AcupuncturistModule,
        AuthenticationModule.forRoot({
        session: {
        absoluteTtl: '14d', // signed out after 14 days, however active
        idleTtl: '3d' // or after 3 days without a request
        }
      })
    ],
    providers: [SessionAuth, Auth],
  }
}
}