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
  @ApiPropertyOptional({
    example: 'Updated Label',
    description: 'Updated value for the metadata key',
  })
  @IsOptional()
  value?: string | number;
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
  
  @IsString()
  file_name:string;
}