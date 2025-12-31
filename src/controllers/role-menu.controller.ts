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

import RoleMenuService from '../services/role-menu.service';
import {
  CreateRoleMenuDto,
  RoleMenuCreateDto,
  UpdateRoleMenuDto,
} from '../dto/role-menu.dto';

@ApiTags('Role Menus')
@Controller('role-menus')
export class RoleMenuController {
  constructor(
    private readonly roleMenuService: RoleMenuService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Assign menu to role' })
  @ApiResponse({
    status: 201,
    description: 'Menu assigned to role successfully',
  })
  create(@Body() body: RoleMenuCreateDto) {
    return this.roleMenuService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all role-menu mappings' })
  @ApiResponse({
    status: 200,
    description: 'List of role-menu mappings',
  })
  list() {
    return this.roleMenuService.findAll();
  }
  @Get(':menuId')
  @ApiOperation({ summary: 'Get all role-menu mappings' })
  @ApiResponse({
    status: 200,
    description: 'List of role-menu mappings',
  })
  listById(@Param('menuId', ParseIntPipe) menuId: number) {
    return this.roleMenuService.findByMenuId(menuId);
  }

  @Put(':roleMenuId')
  @ApiOperation({ summary: 'Update role-menu mapping by ID' })
  @ApiResponse({
    status: 200,
    description: 'Role-menu mapping updated successfully',
  })

  update(
    @Param('roleMenuId', ParseIntPipe) roleMenuId: number,
    @Body() body: UpdateRoleMenuDto,
  ) {
    return this.roleMenuService.update(roleMenuId, body);
  }

  @Delete(':roleMenuId')
  @ApiOperation({ summary: 'Delete role-menu mapping by ID' })
  @ApiResponse({
    status: 200,
    description: 'Role-menu mapping deleted successfully',
  })
  remove(
    @Param('roleMenuId', ParseIntPipe) roleMenuId: number,
  ) {
    return this.roleMenuService.delete(roleMenuId);
  }
}
