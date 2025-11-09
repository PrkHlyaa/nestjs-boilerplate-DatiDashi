import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationMemberResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiPropertyOptional()
  photoUrl?: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
