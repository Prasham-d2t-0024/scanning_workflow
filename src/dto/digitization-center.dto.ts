import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

/**
 * Create Digitization Center DTO
 */
export class DigitizationCenterCreateDto {
  @ApiProperty({
    example: 'hyd_dc_admin',
    description: 'Username for the associated user',
  })
  @IsString()
  username: string;

  @ApiProperty({ example: 'Hyderabad DC' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'HYD-DC-01' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Madhapur, Hyderabad' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'hyd.dc@company.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Ravi Kumar' })
  @IsString()
  manager_name: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  manager_contact: string;
}

/**
 * Update Digitization Center DTO
 */
export class DigitizationCenterUpdateDto {
  @ApiPropertyOptional({ example: 'Updated DC Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'HYD-DC-02' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: 'Updated Address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'updated.dc@company.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'New Manager' })
  @IsOptional()
  @IsString()
  manager_name?: string;

  @ApiPropertyOptional({ example: '9999999999' })
  @IsOptional()
  @IsString()
  manager_contact?: string;
}
