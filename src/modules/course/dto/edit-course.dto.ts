import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  categoryId: number;
}
