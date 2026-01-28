import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, IsArray, ValidateNested, ValidateIf, IsNumber } from 'class-validator';

/**
 * Create MetadataRegistryValue DTO
 */
export class MetadataRegistryValueCreateDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  metadata_registry_id: number;

  @ApiProperty({
    example: 'Button Label',
    description: 'String or Number value',
    oneOf: [
      { type: 'string' },
      { type: 'number' },
    ],
  })
  @ValidateIf(o => typeof o.value === 'string')
  @IsString()
  @ValidateIf(o => typeof o.value === 'number')
  @IsNumber()

  @IsString()
  value: string | number;
}

/**
 * Update MetadataRegistryValue DTO
 */
export class MetadataRegistryValueUpdateDto {
  @ApiProperty({ example: 94 })
  @IsInt()
  metadata_registry_value_id: number;

  @ApiPropertyOptional({
    example: 'Updated Label',
  })
  @IsOptional()
  @IsString()
  value?: string | number;
}

export class MetadataRegistryValueBulkUpdateDto {
  @ApiProperty({
    type: [MetadataRegistryValueUpdateDto],
    description: 'Array of metadata registry values',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetadataRegistryValueUpdateDto)
  items: MetadataRegistryValueUpdateDto[];
}

export class MetadataRegistryValueBulkCreateDto {
  @ApiProperty({
    type: [MetadataRegistryValueCreateDto],
    description: 'Array of metadata registry values',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetadataRegistryValueCreateDto)
  items: MetadataRegistryValueCreateDto[];
  
  @ApiPropertyOptional({
    description: 'Existing Item ID (optional)',
    example: 13,
  })
  @IsOptional()
  @IsInt()
  item_id?: number;

  @ApiPropertyOptional({
    description: 'File name (required only when creating new item)',
    example: 'case_2026',
  })
  @IsOptional()
  @IsString()
  file_name?: string;
}