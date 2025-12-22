import { Injectable, NotFoundException } from '@nestjs/common';
import UserRole from '../models/user_role.model';
import User from '../models/user.model';
import Role from '../models/role.model';
import {
  UserRoleCreateDto,
  UserRoleUpdateDto,
} from '../dto/user-role.dto';

@Injectable()
export default class UserRoleService {
  /**
   * Assign role to user
   */
  async create(data: UserRoleCreateDto) {
    // validate user
    const user = await User.findByPk(data.user_id);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${data.user_id} not found`,
      );
    }

    // validate role
    const role = await Role.findByPk(data.role_id);
    if (!role) {
      throw new NotFoundException(
        `Role with ID ${data.role_id} not found`,
      );
    }

    return UserRole.create({
      user_id: data.user_id,
      role_id: data.role_id,
    });
  }

  /**
   * Get all user-role mappings
   */
  async findAll() {
    return UserRole.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get roles by user ID
   */
  async findByUserId(user_id: number) {
    return UserRole.findAll({
      where: { user_id },
    });
  }

  /**
   * Update role assignment
   */
  async update(id: number, data: UserRoleUpdateDto) {
    const userRole = await UserRole.findByPk(id);

    if (!userRole) {
      throw new NotFoundException(
        `UserRole with ID ${id} not found`,
      );
    }

    await userRole.update({
      role_id: data.role_id ?? userRole.role_id,
    });

    return userRole;
  }

  /**
   * Remove role from user
   */
  async delete(id: number) {
    const userRole = await UserRole.findByPk(id);

    if (!userRole) {
      throw new NotFoundException(
        `UserRole with ID ${id} not found`,
      );
    }

    await userRole.destroy();

    return { success: true, id };
  }
}
