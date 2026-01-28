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

import MetadataGroupService from '../services/metadata-group.service';
import {
  MetadataGroupCreateDto,
  MetadataGroupUpdateDto,
} from '../dto/metadata-group.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Metadata Groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('metadata-groups')
export class MetadataGroupController {
  constructor(
    private readonly service: MetadataGroupService,
  ) {}

  /**
   * Create metadata group
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create metadata group' })
  @ApiResponse({
    status: 201,
    description: 'Metadata group created successfully',
  })
  create(@Body() body: MetadataGroupCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all metadata groups
   */
  @Get()
  @ApiOperation({ summary: 'Get all metadata groups' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get single metadata group
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get metadata group by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'Metadata group not found',
  })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update metadata group
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update metadata group' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MetadataGroupUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete metadata group (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete metadata group' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
