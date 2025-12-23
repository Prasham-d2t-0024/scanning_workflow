import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import UserService from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  list() {
    return this.userService.findAll();
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(userId, body);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
