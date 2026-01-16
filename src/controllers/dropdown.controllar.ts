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

import DropdownService from '../services/dropdown.service';
import {
  DropdownCreateDto,
  DropdownUpdateDto,
} from '../dto/dropdown.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Dropdowns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dropdowns')
export class DropdownController {
  constructor(
    private readonly service: DropdownService,
  ) {}

  /**
   * Create dropdown
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create dropdown' })
  @ApiResponse({ status: 201, description: 'Dropdown created' })
  create(@Body() body: DropdownCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all dropdowns
   */
  @Get()
  @ApiOperation({ summary: 'Get all dropdowns' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get dropdown by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get dropdown by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Dropdown not found' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update dropdown (and its options)
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update dropdown' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DropdownUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete dropdown (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete dropdown' })
  @ApiResponse({ status: 204 })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.service.delete(id);
  }

  /**
   * Delete a single dropdown option
   */
  @Delete('option/:optionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete dropdown option' })
  @ApiResponse({ status: 204 })
  async removeOption(
    @Param('optionId', ParseIntPipe) optionId: number,
  ) {
    await this.service.deleteOption(optionId);
  }
}
