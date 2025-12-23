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

import MenuService from '../services/menu.service';
import { CreateMenuDto, UpdateMenuDto } from '../dto/menu.dto';

@ApiTags('Menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 201, description: 'Menu created successfully' })
  create(@Body() body: CreateMenuDto) {
    return this.menuService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'List of menus' })
  list() {
    return this.menuService.findAll();
  }

  @Put(':menuId')
  @ApiOperation({ summary: 'Update menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu updated successfully' })
  update(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() body: UpdateMenuDto,
  ) {
    return this.menuService.update(menuId, body);
  }

  @Delete(':menuId')
  @ApiOperation({ summary: 'Delete menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu deleted successfully' })
  remove(
    @Param('menuId', ParseIntPipe) menuId: number,
  ) {
    return this.menuService.delete(menuId);
  }
}
