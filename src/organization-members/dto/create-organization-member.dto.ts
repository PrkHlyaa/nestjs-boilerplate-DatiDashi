import { IsString, MaxLength, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizationMemberDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the team member' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'CEO & Founder',
    description: 'Position/Role of the team member',
  })
  @IsString()
  @MaxLength(255)
  position: string;

  @ApiPropertyOptional({
    example: 'https://example.com/photo.jpg',
    description: 'Photo URL or base64 image data of the team member',
  })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Display order (lower numbers appear first)',
  })
  @IsInt()
  @IsOptional()
  order?: number;
}
