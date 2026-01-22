import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

/**
 * Create User DTO
 */
export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  full_name!: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Unique username',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'User password (plain text)',
  })
  @IsString()
  password!: string;

  @ApiProperty({
    example: 1,
    description: 'User type ID',
  })
  // @IsInt()
  // user_type_id!: number;

  @ApiProperty({
    example: [1, 2],
    description: 'List of role IDs assigned to the user',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  role_ids!: number[];

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  menu_ids!: number[];
}

/**
 * Update User DTO
 */
export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({
    example: 'janedoe',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    example: 'NewP@ssw0rd',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    example: 2,
  })
  // @IsOptional()
  // @IsInt()
  // user_type_id?: number;

  @ApiPropertyOptional({
    example: [2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  role_ids?: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  menu_ids!: number[];
}
