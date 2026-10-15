import { Exclude, Expose, plainToInstance } from "class-transformer";

@Exclude()
export class CreateAcupuncturistResponseDto{
    @Expose()
    id:string

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    emailVerified: boolean

    static fromEntity(entity: any): CreateAcupuncturistResponseDto {
    return plainToInstance(CreateAcupuncturistResponseDto, entity, {
      excludeExtraneousValues: true,
    });}
}