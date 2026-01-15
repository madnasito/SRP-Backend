import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class EditCourseDto {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    imageUrl: string;
}