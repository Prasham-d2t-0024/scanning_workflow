import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

/**
 * Create Batch DTO
 */
export class BatchCreateDto {
  @ApiProperty({
    example: 'Batch A',
    description: 'Name of the batch',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Status of the batch',
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/**
 * Update Batch DTO
 */
export class BatchUpdateDto {
  @ApiPropertyOptional({
    example: 'Batch B',
    description: 'Updated name of the batch',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'inactive',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
