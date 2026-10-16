import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "@nestjs/authentication";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import configuration from "./config/configuration";

@Global()
@Module(
{
    imports:[
      ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true,
      }),
      DatabaseModule,
      AuthModule.register()
    ],
    providers:[],
    exports:[DatabaseModule]
}
)
export class CommonModule {}