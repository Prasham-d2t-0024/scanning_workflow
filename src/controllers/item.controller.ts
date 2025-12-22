import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import ItemService from '../services/item.service';
import { ItemCreateDto, ItemUpdateDto } from '../dto/item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemController {
  constructor(
    private readonly service: ItemService,
  ) {}

  /**
   * Create an item
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  create(@Body() body: ItemCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all items
   */
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get single item
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Item not found' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update an item
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ItemUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete an item (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete item' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
