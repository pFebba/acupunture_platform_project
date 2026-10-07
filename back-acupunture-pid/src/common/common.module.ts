import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";

@Global()
@Module(
{
    imports:[
        ConfigModule,
        DatabaseModule
    ],
    providers:[],
    exports:[]
}
)
export class CommonModule {}