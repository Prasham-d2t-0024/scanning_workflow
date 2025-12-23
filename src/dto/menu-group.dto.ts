import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
} from 'class-validator';

/**
 * Create Menu Group DTO
 */
export class CreateMenuGroupDto {
  @ApiProperty({
    example: 'Administration',
    description: 'Menu group name',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Sorting order of the menu group',
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Status of the menu group',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/**
 * Update Menu Group DTO
 */
export class UpdateMenuGroupDto {
  @ApiPropertyOptional({
    example: 'System Settings',
    description: 'Menu group name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Sorting order of the menu group',
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional({
    example: 'inactive',
    description: 'Status of the menu group',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
