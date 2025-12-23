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

import MenuGroupService from '../services/menu-group.service';
import {
  CreateMenuGroupDto,
  UpdateMenuGroupDto,
} from '../dto/menu-group.dto';

@ApiTags('Menu Groups')
@Controller('menu-groups')
export class MenuGroupController {
  constructor(
    private readonly menuGroupService: MenuGroupService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu group' })
  @ApiResponse({ status: 201, description: 'Menu group created successfully' })
  create(@Body() body: CreateMenuGroupDto) {
    return this.menuGroupService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menu groups' })
  @ApiResponse({ status: 200, description: 'List of menu groups' })
  list() {
    return this.menuGroupService.findAll();
  }

  @Put(':menuGroupId')
  @ApiOperation({ summary: 'Update menu group by ID' })
  @ApiResponse({ status: 200, description: 'Menu group updated successfully' })
  update(
    @Param('menuGroupId', ParseIntPipe) menuGroupId: number,
    @Body() body: UpdateMenuGroupDto,
  ) {
    return this.menuGroupService.update(menuGroupId, body);
  }

  @Delete(':menuGroupId')
  @ApiOperation({ summary: 'Delete menu group by ID' })
  @ApiResponse({ status: 200, description: 'Menu group deleted successfully' })
  remove(
    @Param('menuGroupId', ParseIntPipe) menuGroupId: number,
  ) {
    return this.menuGroupService.delete(menuGroupId);
  }
}
