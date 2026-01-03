import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsArray,
} from 'class-validator';

/**
 * Create Menu DTO
 */
export class CreateMenuDto {
  @ApiProperty({
    example: 1,
    description: 'Menu group ID',
  })
  @IsInt()
  menu_group_id!: number;

  @ApiProperty({
    example: 'Dashboard',
    description: 'Menu name',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: '/dashboard',
    description: 'Menu route path',
  })
  @IsString()
  path!: string;

  @ApiPropertyOptional({
    example: 'dashboard',
    description: 'Icon name',
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Menu status',
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roleIds?: number[];
}

/**
 * Update Menu DTO
 */
export class UpdateMenuDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  menu_group_id?: number;

  @ApiPropertyOptional({
    example: 'Dashboard',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '/dashboard',
  })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiPropertyOptional({
    example: 'dashboard',
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({
    example: 'inactive',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
