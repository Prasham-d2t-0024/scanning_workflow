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

import UserMenuService from '../services/user-menu.service';
import {
  BulkCreateUserMenuDto,
  UpdateUserMenuDto,
} from '../dto/user-menu.dto';

@ApiTags('User Menus')
@Controller('user-menus')
export class UserMenuController {
  constructor(
    private readonly userMenuService: UserMenuService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Assign menus to user' })
  @ApiResponse({
    status: 201,
    description: 'Menus assigned to user successfully',
  })
  create(@Body() body: BulkCreateUserMenuDto) {
    return this.userMenuService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user-menu mappings' })
  @ApiResponse({
    status: 200,
    description: 'List of user-menu mappings',
  })
  list() {
    return this.userMenuService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get menus by user' })
  @ApiResponse({
    status: 200,
    description: 'List of menus assigned to user',
  })
  listByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userMenuService.findByUser(userId);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user-menu mappings' })
  @ApiResponse({
    status: 200,
    description: 'User-menu mappings updated successfully',
  })
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserMenuDto,
  ) {
    return this.userMenuService.update(userId, body);
  }

  @Delete(':userMenuId')
  @ApiOperation({ summary: 'Delete user-menu mapping by ID' })
  @ApiResponse({
    status: 200,
    description: 'User-menu mapping deleted successfully',
  })
  remove(
    @Param('userMenuId', ParseIntPipe) userMenuId: number,
  ) {
    return this.userMenuService.delete(userMenuId);
  }
}
