import {
  IsString,
  IsArray,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePricingDto {
  @ApiProperty({
    example: 'Basic Plan',
    description: 'Name of the pricing plan',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'Perfect for individuals',
    description: 'Description of the pricing plan',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 99000, description: 'Price amount' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    example: 'month',
    description: 'Billing period (month/year)',
  })
  @IsString()
  @IsOptional()
  period?: string;

  @ApiPropertyOptional({
    example: ['Feature 1', 'Feature 2'],
    description: 'List of features',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
}
