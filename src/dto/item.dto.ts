import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/**
 * Create Item DTO
 */
export class ItemCreateDto {
  @ApiProperty({
    example: 'Item A',
    description: 'Name of the item',
  })
  @IsString()
  name: string;
}

/**
 * Update Item DTO
 */
export class ItemUpdateDto {
  @ApiPropertyOptional({
    example: 'Item B',
    description: 'Updated name of the item',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
