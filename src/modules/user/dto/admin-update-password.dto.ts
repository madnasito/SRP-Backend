import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AdminUpdatePasswordDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
