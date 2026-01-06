import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateUserMenuDto {
  @ApiProperty({
    example: 12,
    description: 'User ID',
  })
  @Type(() => Number)
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 5,
    description: 'Menu ID',
  })
  @Type(() => Number)
  @IsInt()
  menu_id: number;
}

export class BulkCreateUserMenuDto {
  @ApiProperty({
    example: 12,
    description: 'User ID',
  })
  @Type(() => Number)
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: [1, 2, 3, 4],
    description: 'Menu IDs assigned to the user',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  menu_ids: number[];
}

export class UpdateUserMenuDto {
  @ApiProperty({
    example: [2, 5, 7],
    description: 'Updated list of menu IDs for the user',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  menu_ids: number[];
}
