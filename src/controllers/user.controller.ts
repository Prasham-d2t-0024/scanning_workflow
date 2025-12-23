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

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../services/user.service';

import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() body: CreateUserDto) {
    return createUser(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  list() {
    return getAllUsers();
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ) {
    return updateUser(userId, body);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
