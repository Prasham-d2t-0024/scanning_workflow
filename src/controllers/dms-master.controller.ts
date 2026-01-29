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

import DmsMasterService from '../services/dms-master.service';
import {
  DmsMasterCreateDto,
  DmsMasterUpdateDto,
} from '../dto/dms-master.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('DMS Master')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dms-masters')
export class DmsMasterController {
  constructor(private readonly service: DmsMasterService) {}

  /**
   * Create DMS
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create DMS master record' })
  @ApiResponse({ status: 201 })
  create(@Body() body: DmsMasterCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all DMS records
   */
  @Get()
  @ApiOperation({ summary: 'Get all DMS master records' })
  @ApiResponse({ status: 200 })
  list() {
    return this.service.findAll();
  }

  /**
   * Get DMS by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get DMS master by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update DMS
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update DMS master record' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DmsMasterUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete DMS (Soft Delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete DMS master record' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
