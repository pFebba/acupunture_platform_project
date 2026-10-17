import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from '@nestjs/authentication';
@Module({
  imports: [
    AuthenticationModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      globalGuard: process.env.IS_AUTH_ENABLED === 'true',
      useFactory: (configService: ConfigService) => {
        return {
           session: {
            absoluteTtl: '14d', // signed out after 14 days, however active
            idleTtl: '3d', // or after 3 days without a request
          },
        };
      },
    }),
  ],
  exports: [AuthenticationModule],
})
export class AuthModule {}