import { ConfigService } from "@nestjs/config";

export class dbContext{
    private static dbContext: dbContext

    private constructor(){}

    public static getDbContext(): dbContext{
        if(this.dbContext === null)
            return new dbContext()

        return this.dbContext
    }

    public getDbConfig(configService: ConfigService){
        
        return {...configService.get('database')}
    }
}