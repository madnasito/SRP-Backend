import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateLessonDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsNotEmpty()
    @IsUrl()
    videoUrl: string;
}