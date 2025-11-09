import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({
    example: 'Fast Performance',
    description: 'Name of the feature',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Lightning fast load times',
    description: 'Description of the feature',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: 'fa-bolt',
    description: 'FontAwesome icon class',
  })
  @IsString()
  @IsOptional()
  icon?: string;
}
