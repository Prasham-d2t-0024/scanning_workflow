import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

/**
 * Create MetadataRegistryValue DTO
 */
export class MetadataRegistryValueCreateDto {
  @ApiProperty({
    example: 1,
    description: 'Metadata Registry ID',
  })
  @IsInt()
  metadata_registry_id: number;

  @ApiProperty({
    example: 'Button Label',
    description: 'Value for the metadata key',
  })
  @IsString()
  value: string;
}

/**
 * Update MetadataRegistryValue DTO
 */
export class MetadataRegistryValueUpdateDto {
  @ApiPropertyOptional({
    example: 'Updated Label',
    description: 'Updated value for the metadata key',
  })
  @IsOptional()
  @IsString()
  value?: string;
}
