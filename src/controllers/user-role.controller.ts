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

import UserRoleService from '../services/user-role.service';
import {
  UserRoleCreateDto,
  UserRoleUpdateDto,
} from '../dto/user-role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-roles')
export class UserRoleController {
  constructor(
    private readonly service: UserRoleService,
  ) {}

  /**
   * Assign role to user
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({ status: 201 })
  create(@Body() body: UserRoleCreateDto) {
    return this.service.create(body);
  }

  /**
   * Get all user-role mappings
   */
  @Get()
  @ApiOperation({ summary: 'Get all user roles' })
  findAll() {
    return this.service.findAll();
  }

  /**
   * Get roles for a specific user
   */
  @Get('user/:user_id')
  @ApiOperation({ summary: 'Get roles by user ID' })
  findByUser(
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    return this.service.findByUserId(user_id);
  }

  /**
   * Update role assignment
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update user role' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserRoleUpdateDto,
  ) {
    return this.service.update(id, body);
  }

  /**
   * Remove role from user
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
