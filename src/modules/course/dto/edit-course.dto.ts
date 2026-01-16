import { IsInt, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class EditCourseDto {

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    id: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}