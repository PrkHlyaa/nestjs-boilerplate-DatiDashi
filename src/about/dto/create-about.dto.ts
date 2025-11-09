import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  MinLength,
} from 'class-validator';

export class CreateAboutDto {
  @ApiProperty({ example: 'About Our Company' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'We are a leading technology company...' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 'about', required: false })
  @IsString()
  @IsOptional()
  section?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
