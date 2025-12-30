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

import DigitizationCenterService from '../services/digitization-center.service';
import {
  DigitizationCenterCreateDto,
  DigitizationCenterUpdateDto,
} from '../dto/digitization-center.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Digitization Centers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('digitization-centers')
export class DigitizationCenterController {
  constructor(
    private readonly service: DigitizationCenterService,
  ) {}

  /**
   * Create center
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create digitization center' })
  @ApiResponse({ status: 201 })
  create(@Body() body: DigitizationCenterCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all centers
   */
  @Get()
  @ApiOperation({ summary: 'Get all digitization centers' })
  list() {
    return this.service.findAll();
  }

  /**
   * Get center by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get digitization center by ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  /**
   * Update center
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update digitization center' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DigitizationCenterUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Delete center (Soft delete)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete digitization center' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
