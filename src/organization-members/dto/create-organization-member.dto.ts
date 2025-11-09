import { IsString, MaxLength, IsOptional } from 'class-validator';
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
    description: 'Photo URL of the team member',
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  photoUrl?: string;
}
