import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import AuthService, { LoginInput } from '../services/auth.service';
import{ LoginDto } from '../dto/login.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
