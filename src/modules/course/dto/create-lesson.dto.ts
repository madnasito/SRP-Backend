import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateLessonDto {

    @IsNotEmpty()
    @IsInt()
    course: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsNotEmpty()
    @IsUrl()
    videoUrl: string;
}