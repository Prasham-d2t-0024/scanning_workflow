import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

/**
 * Create Role-Menu DTO
 */
export class CreateRoleMenuDto {
  @ApiProperty({
    example: 1,
    description: 'Role ID',
  })
  @IsInt()
  role_id!: number;

  @ApiProperty({
    example: 5,
    description: 'Menu ID',
  })
  @IsInt()
  menu_id!: number;
}

/**
 * Update Role-Menu DTO
 */
export class UpdateRoleMenuDto {
  @ApiPropertyOptional({
    example: 2,
    description: 'Role ID',
  })
  @IsOptional()
  @IsInt()
  role_id?: number;

  @ApiPropertyOptional({
    example: 8,
    description: 'Menu ID',
  })
  @IsOptional()
  @IsInt()
  menu_id?: number;
}
