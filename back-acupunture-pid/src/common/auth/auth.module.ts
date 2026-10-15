import { Module } from '@nestjs/common';
import { SessionAuth } from './session-auth.provider.js';
import { AcupuncturistModule } from 'src/features/crud-operations/acupuncturist/acupuncturist.module.js';
import { AuthController } from '../api/auth.controller.js';
import { Auth } from './auth.js';
import { ConfigService } from '@nestjs/config';



@Module({
  controllers:[AuthController],
  imports: [AcupuncturistModule],
  providers: [SessionAuth, Auth],
})
export class AuthModule {constructor(private readonly configService: ConfigService) {const isAuthEnabled = this.configService.get('auth.isEnabled');}
  
}