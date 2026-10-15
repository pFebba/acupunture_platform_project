import { Module } from '@nestjs/common';
import { SessionAuth } from './session-auth.provider.js';
import { AcupuncturistModule } from 'src/features/crud-operations/acupuncturist/acupuncturist.module.js';

@Module({
  imports: [AcupuncturistModule],
  providers: [SessionAuth],
})
export class AuthModule {}