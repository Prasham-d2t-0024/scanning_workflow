import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
} from 'class-validator';

/**
 * Create Metadata Registry DTO
 */
export class MetadataRegistryCreateDto {
  @ApiProperty({
    example: 'label',
    description: 'Metadata key name',
  })
  @IsString()
  key: string;

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
}

/**
 * Update Metadata Registry DTO
 */
export class MetadataRegistryUpdateDto {
  @ApiPropertyOptional({
    example: 'placeholder',
  })
  @IsOptional()
  @IsString()
  key?: string;

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
}
