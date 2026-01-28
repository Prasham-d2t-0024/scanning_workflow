import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

/**
 * Create Metadata Group DTO
 */
export class MetadataGroupCreateDto {
  @ApiProperty({
    example: 'Patient Details',
    description: 'Name of the metadata group',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Status of the metadata group',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/**
 * Update Metadata Group DTO
 */
export class MetadataGroupUpdateDto {
  @ApiPropertyOptional({
    example: 'Patient Details - Updated',
    description: 'Updated name of the metadata group',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'inactive',
    description: 'Updated status of the metadata group',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
