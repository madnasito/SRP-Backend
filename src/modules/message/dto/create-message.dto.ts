import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}