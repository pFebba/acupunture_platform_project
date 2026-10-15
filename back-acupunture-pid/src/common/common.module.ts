import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "@nestjs/authentication";
import { AuthModule } from "./security/auth.module";
import { DatabaseModule } from "./database/database.module";

@Global()
@Module(
{
    imports:[
        ConfigModule,
        DatabaseModule,
        AuthModule,
        AuthenticationModule.forRoot({
        session: {
        absoluteTtl: '14d', // signed out after 14 days, however active
        idleTtl: '3d' // or after 3 days without a request
      },
    }),
    ],
    providers:[],
    exports:[]
}
)
export class CommonModule {}