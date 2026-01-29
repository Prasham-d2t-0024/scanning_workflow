import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

/**
 * Create DMS Master DTO
 */
export class DmsMasterCreateDto {
  @ApiProperty({
    example: 'https://api.dms.internal/v1',
    description: 'DMS endpoint URL',
  })
  @IsString()
  endpoint: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Is this the primary DMS endpoint',
  })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the DMS endpoint is active',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

/**
 * Update DMS Master DTO
 */
export class DmsMasterUpdateDto {
  @ApiPropertyOptional({
    example: 'https://api.dms.internal/v2',
    description: 'Updated DMS endpoint URL',
  })
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Is this the primary DMS endpoint',
  })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the DMS endpoint is active',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
