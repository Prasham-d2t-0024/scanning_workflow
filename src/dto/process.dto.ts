import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsIn } from 'class-validator';

/**
 * Create Process DTO
 */
export class ProcessCreateDto {
  @ApiProperty({
    example: 'Patient Registration',
    description: 'Name of the process',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/webhooks/patient-registration',
    description: 'Webhook URL for the process',
  })
  @IsString()
  @IsUrl()
  webhook: string;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Status of the process',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}

/**
 * Update Process DTO
 */
export class ProcessUpdateDto {
  @ApiPropertyOptional({
    example: 'Patient Registration - Updated',
    description: 'Updated name of the process',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '/webhook/rddf-csx from n8n',
    description: 'Updated webhook URL',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  webhook?: string;

  @ApiPropertyOptional({
    example: 'inactive',
    description: 'Updated status of the process',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
