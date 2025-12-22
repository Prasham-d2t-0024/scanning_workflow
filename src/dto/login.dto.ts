import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'superadmin' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'Akz!@1970000' })
  @IsString()
  @MinLength(6)
  password!: string;
}
