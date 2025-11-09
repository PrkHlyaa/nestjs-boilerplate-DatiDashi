import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PricingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional()
  period?: string;

  @ApiPropertyOptional({ type: [String] })
  features?: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
