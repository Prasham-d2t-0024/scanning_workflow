import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';

/**
 * Create Metadata Registry DTO
 */
export class MetadataRegistryCreateDto {
  @ApiProperty({
    example: 'dc.title',
    description: 'Metadata key name',
  })
  @IsString()
  key: string;
  @ApiProperty({
    example: 'Author',
    description: 'Metadata title',
  })
  @IsString()
  title: string;
  @ApiProperty({
    example: true,
    description: 'Is this metadata required?',
  })
  @IsBoolean()
  isrequired: boolean;

  @ApiProperty({
    example: 1,
    description: 'Referenced ComponentType ID',
  })
  @IsInt()
  componenttype_id: number;

  @ApiProperty({
    example: false,
    description: 'Can this metadata have multiple values?',
  })
  @IsBoolean()
  ismultiple: boolean;

  @ApiPropertyOptional({
  example: 5,
  description: 'Optional dropdown ID (only if metadata uses dropdown)',
})
  @IsOptional()
  @IsInt()
  dropdown_id?: number;

  @ApiProperty()
  @IsNumber()
  metadata_group_id: number;
}

/**
 * Update Metadata Registry DTO
 */
export class MetadataRegistryUpdateDto {
  @ApiPropertyOptional({
    example: 'dc.title',
  })
  @IsOptional()
  @IsString()
  key?: string;
  @ApiPropertyOptional({
    example: 'Author',
  })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isrequired?: boolean;

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  componenttype_id?: number;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  ismultiple?: boolean;

  @ApiPropertyOptional({
    example: 5,
    nullable: true,
    description: 'Dropdown ID or null to remove dropdown',
  })
  @IsOptional()
  @IsInt()
  dropdown_id?: number | null;

  @ApiProperty()
  @IsNumber()
  metadata_group_id: number;
}


export class MetadataReorderItemDto {
  @IsInt()
  metadata_registry_id: number;

  @IsInt()
  @Min(0)
  metadataOrder: number;
}

export class MetadataRegistryReorderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetadataReorderItemDto)
  items: MetadataReorderItemDto[];
}