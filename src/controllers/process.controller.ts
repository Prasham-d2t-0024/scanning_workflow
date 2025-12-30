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

import ProcessService from '../services/process.service';
import { ProcessCreateDto, ProcessUpdateDto } from '../dto/process.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Processes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('processes')
export class ProcessController {
  constructor(
    private readonly service: ProcessService,
  ) {}

  /**
   * Create a process
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create process' })
  @ApiResponse({ status: 201, description: 'Process created successfully' })
  create(@Body() body: ProcessCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all processes
   */
  @Get()
  @ApiOperation({ summary: 'Get all processes' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get single process
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get process by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Process not found' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update a process
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update process' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProcessUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete a process (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete process' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
