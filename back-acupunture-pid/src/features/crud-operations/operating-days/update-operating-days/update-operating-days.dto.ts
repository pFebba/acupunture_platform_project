import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export class UpdateOperatingDaysDTO {
    @IsOptional()
    @IsBoolean()
    is_open?: boolean;

    @IsOptional()
    @IsString()
    @Matches(TIME_REGEX, { message: 'opening_time deve estar no formato HH:MM ou HH:MM:SS' })
    opening_time?: string;

    @IsOptional()
    @IsString()
    @Matches(TIME_REGEX, { message: 'closing_time deve estar no formato HH:MM ou HH:MM:SS' })
    closing_time?: string;
}
