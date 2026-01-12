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

import MetadataRegistryService from '../services/metadata-registry.service';
import {
  MetadataRegistryCreateDto,
  MetadataRegistryReorderDto,
  MetadataRegistryUpdateDto,
} from '../dto/metadata-registry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Metadata Registry')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('metadata-registries')
export class MetadataRegistryController {
  constructor(
    private readonly service: MetadataRegistryService,
  ) {}

  /**
   * Create Metadata Registry
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Metadata Registry' })
  @ApiResponse({ status: 201, description: 'Metadata Registry created' })
  create(@Body() body: MetadataRegistryCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all Metadata Registries
   */
  @Get()
  @ApiOperation({ summary: 'Get all Metadata Registries' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get Metadata Registry by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get Metadata Registry by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Metadata Registry not found' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update Metadata Registry
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update Metadata Registry' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MetadataRegistryUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete Metadata Registry (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Metadata Registry' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }

  @Post('reorder')
  async reorder(@Body() body: MetadataRegistryReorderDto) {
    return this.service.metadataReorder(body.items);
  }
}
