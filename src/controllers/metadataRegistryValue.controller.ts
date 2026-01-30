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
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import MetadataRegistryValueService from '../services/metadata-registry-value.service';
import {
  MetadataRegistryValueBulkCreateDto,
  MetadataRegistryValueBulkUpdateDto,
  MetadataRegistryValueCreateDto,
  MetadataRegistryValueUpdateDto,
} from '../dto/metadata-registry-value.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('MetadataRegistryValues')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('metadata-registry-values')
export class MetadataRegistryValueController {
  constructor(
    private readonly service: MetadataRegistryValueService,
  ) {}

  /**
   * Create MetadataRegistryValue
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create MetadataRegistryValue' })
  @ApiResponse({ status: 201, description: 'MetadataRegistryValue created' })
  create(@Body() body: MetadataRegistryValueBulkCreateDto, @Req() req:any) {
    return this.service.create(body, req.user.user_id);
  }

  /**
   * Get all MetadataRegistryValues
   */
  @Get()
  @ApiOperation({ summary: 'Get all MetadataRegistryValues' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get MetadataRegistryValue by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get MetadataRegistryValue by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'MetadataRegistryValue not found' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Get MetadataRegistryValue by itemID
   */
  @Get('item/:itemId')
  @ApiOperation({ summary: 'Get MetadataRegistryValue by itemId' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'MetadataRegistryValue not found' })
  getByItemId(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.service.findByItemId(itemId);
  }

  /**
   * Update MetadataRegistryValue
   */
  @Put('bulk')
  @ApiOperation({ summary: 'Bulk update MetadataRegistryValues by ID' })
  @ApiResponse({ status: 200, description: 'MetadataRegistryValues updated' })
  bulkUpdate(
    @Body() body: MetadataRegistryValueBulkUpdateDto,
  ) {
    return this.service.update(body);
  }

  /**
   * Delete MetadataRegistryValue (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete MetadataRegistryValue' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
