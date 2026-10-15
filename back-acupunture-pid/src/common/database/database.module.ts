import { Module } from "@nestjs/common";
import { dbContext } from "./dbContext";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "node_modules/@nestjs/config/dist/config.module";
import { ConfigService } from "node_modules/@nestjs/config/dist/config.service";

const dbInstance = dbContext.getDbContext()
@Module(
{
    imports:[
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
        dbInstance.getDbConfig(configService),
    })
    ]
}
)
export class DatabaseModule {}