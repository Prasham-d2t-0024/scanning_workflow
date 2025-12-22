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

import BatchService from '../services/batch.service';
import { BatchCreateDto, BatchUpdateDto } from '../dto/batch.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Batches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('batches')
export class BatchController {
  constructor(
    private readonly service: BatchService,
  ) {}

  /**
   * Create Batch
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Batch' })
  @ApiResponse({ status: 201, description: 'Batch created' })
  create(@Body() body: BatchCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all Batches
   */
  @Get()
  @ApiOperation({ summary: 'Get all Batches' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get Batch by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get Batch by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Batch not found' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update Batch
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update Batch' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: BatchUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete Batch (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Batch' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
