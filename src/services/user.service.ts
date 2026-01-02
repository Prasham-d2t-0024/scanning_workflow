import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../models/user.model';
import UserRole from '../models/user_role.model';
import { encryptPassword } from '../utils/password.util';
import { Menu, Role } from 'src/models';

@Injectable()
export default class UserService {
  /**
   * Create user
   */
  async create(input: any) {
    const hashedPassword = await encryptPassword(input.password);

    const user = await User.create({
      full_name: input.full_name,
      username: input.username,
      password: hashedPassword,
      user_type_id: input.user_type_id,
    });

    if (input.role_ids?.length) {
      await UserRole.bulkCreate(
        input.role_ids.map((role_id: number) => ({
          user_id: user.user_id,
          role_id,
        })),
      );
    }

    return user;
  }

  /**
   * Get all users
   */
  async findAll() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },

      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['role_id', 'name'],

          through: { attributes: [] },

          include: [
            {
              model: Menu,
              as: 'menus',
              attributes: [
                'menu_id',
                'menu_group_id',
                'name',
                'path',
                'icon',
                'order',
                'status',
              ],
              through: { attributes: [] },
            },
          ],
        },
      ],

      subQuery: false,
    });

    return this.flattenUserRolesAndMenus(users);
  }

  /**
   * Update user
   */
  async update(userId: number, input: any) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (input.password) {
      input.password = await encryptPassword(input.password);
    }

    await user.update(input);
    return user;
  }

  /**
   * Delete user
   */
  async delete(userId: number) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.destroy();

    return { success: true, userId };
  }

  private flattenUserRolesAndMenus(users: any[]) {
    return users.map((user) => {
      const roleMap = new Map<number, any>();
      const menuMap = new Map<number, any>();

      user.roles?.forEach((role) => {
        // collect unique roles
        roleMap.set(role.role_id, {
          role_id: role.role_id,
          name: role.name,
        });

        // collect unique menus across all roles
        role.menus?.forEach((menu) => {
          menuMap.set(menu.menu_id, {
            menu_id: menu.menu_id,
            menu_group_id: menu.menu_group_id,
            name: menu.name,
            path: menu.path,
            icon: menu.icon,
            order: menu.order,
            status: menu.status,
          });
        });
      });

      return {
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        user_type_id: user.user_type_id,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,

        roles: Array.from(roleMap.values()),
        menus: Array.from(menuMap.values()),
      };
    });
  }

}
