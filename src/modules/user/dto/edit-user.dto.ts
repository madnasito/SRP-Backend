import { IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
