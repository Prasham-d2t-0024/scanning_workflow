import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

/**
 * Create ComponentType DTO
 */
export class ComponentTypeCreateDto {
  @ApiProperty({
    example: 'Button',
    description: 'Name of the component type',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Status of the component type',
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/**
 * Update ComponentType DTO
 * (All fields optional)
 */
export class ComponentTypeUpdateDto extends PartialType(
  ComponentTypeCreateDto,
) {}
