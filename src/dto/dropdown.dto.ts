import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

/* ----------------------------------
   Dropdown Option DTO
---------------------------------- */
export class DropdownOptionDto {
  @ApiProperty({ example: 'Open' })
  @IsString()
  label: string;

  @ApiProperty({ example: 'OPEN' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  sort_order?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

//   @ApiPropertyOptional({ example: false })
//   @IsOptional()
//   @IsBoolean()
//   isDeletedByUser?: boolean;
}

export class DropdownUpdateOptionDto {
  @ApiProperty({ example: 'Open' })
  @IsString()
  label: string;

  @ApiProperty({ example: 'OPEN' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  sort_order?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isDeletedByUser?: boolean;
}

/* ----------------------------------
   Create Dropdown DTO
---------------------------------- */
export class DropdownCreateDto {
  @ApiProperty({ example: 'case_status' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Case Status' })
  @IsString()
  name: string;

  @ApiProperty({ type: [DropdownOptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DropdownOptionDto)
  options: DropdownOptionDto[];
}

/* ----------------------------------
   Update Dropdown DTO
---------------------------------- */
export class DropdownUpdateDto {
  @ApiProperty({ example: 'case_status' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Case Status' })
  @IsString()
  name: string;

  @ApiProperty({ type: [DropdownUpdateOptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DropdownUpdateOptionDto)
  options: DropdownUpdateOptionDto[];
}
