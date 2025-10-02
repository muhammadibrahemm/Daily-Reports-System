import { IsString, IsDateString, Length } from "class-validator";

export class CreateReportDto {

    @IsDateString()
    date: Date;

    @IsString()
    @Length(5, 1000)
    task: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string
}
