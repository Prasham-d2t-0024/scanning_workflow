import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

/**
 * Create Role DTO
 */
export class RoleCreateDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role name (admin, super_admin, doctor, staff)',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Administrator role',
    description: 'Role description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Role status',
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/**
 * Update Role DTO
 */
export class RoleUpdateDto {
  @ApiPropertyOptional({
    example: 'doctor',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Doctor role with limited access',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'inactive',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
