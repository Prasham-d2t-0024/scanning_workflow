import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

/**
 * Assign Role to User
 */
export class UserRoleCreateDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 2,
    description: 'Role ID',
  })
  @IsInt()
  role_id: number;
}

/**
 * Update User Role (rare, but supported)
 */
export class UserRoleUpdateDto {
  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  role_id?: number;
}
