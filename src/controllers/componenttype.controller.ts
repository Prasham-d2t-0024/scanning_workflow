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

import ComponentTypeService from '../services/componenttype.service';
import {ComponentTypeCreateDto } from '../dto/componenttype.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ComponentTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('componenttypes')
export class ComponentTypeController {
  constructor(
    private readonly service: ComponentTypeService,
  ) {}

  /**
   * Create ComponentType
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create ComponentType' })
  @ApiResponse({ status: 201, description: 'ComponentType created' })
  create(@Body() body: ComponentTypeCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all ComponentTypes
   */
  @Get()
  @ApiOperation({ summary: 'Get all ComponentTypes' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get ComponentType by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get ComponentType by ID' })
  @ApiResponse({ status: 200 })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update ComponentType
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update ComponentType' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ComponentTypeCreateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete ComponentType (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete ComponentType' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
