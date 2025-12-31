import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

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

export class RoleMenuCreateDto {
  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber()
  menu_group_id: number;

  @ApiProperty({ example: 'Dashboard' })
  @IsString()
  name: string;

  @ApiProperty({ example: '/dashboard' })
  @IsString()
  path: string;

  @ApiProperty({ example: 'fas fa-calender' })
  @IsString()
  icon: string;

  @ApiProperty({ example: 'active', enum: ['active', 'inactive'] })
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

  @ApiProperty({ example: ['4','1'], type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  role_ids: string[];
}

/**
 * Update Role-Menu DTO
 */
export class UpdateRoleMenuDto {
  // @ApiPropertyOptional({
  //   example: 2,
  //   description: 'Role ID',
  // })
  // @IsOptional()
  // @IsInt()
  // role_id?: number;

  // @ApiPropertyOptional({
  //   example: 8,
  //   description: 'Menu ID',
  // })
  // @IsOptional()
  // @IsInt()
  // menu_id?: number;

    @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber()
  menu_group_id: number;

  @ApiProperty({ example: 'Dashboard' })
  @IsString()
  name: string;

  @ApiProperty({ example: '/dashboard' })
  @IsString()
  path: string;

  @ApiProperty({ example: 'fas fa-user' })
  @IsString()
  icon: string;

  @ApiProperty({ example: 'active', enum: ['active', 'inactive'] })
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

  @ApiProperty({ example: ['4'], type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  role_ids: string[];
}
