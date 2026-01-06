import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../models/user.model';
import UserRole from '../models/user_role.model';
import { encryptPassword } from '../utils/password.util';
import { Menu, Role } from 'src/models';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export default class UserService {
  /**
   * Create user
   */
  async create(input: CreateUserDto) {
    const t = await User.sequelize.transaction();

    try {
      const hashedPassword = await encryptPassword(input.password);

      const user = await User.create(
        {
          full_name: input.full_name,
          username: input.username,
          password: hashedPassword,
          // user_type_id: input.user_type_id || null,
        },
        { transaction: t }
      );

      if (input.role_ids?.length) {
        await user.addRoles(input.role_ids, { transaction: t });
      }

      if (input.menu_ids?.length) {
        await user.addMenus(input.menu_ids, { transaction: t });
      }

      await t.commit();

      return user;
    } catch (error) {
      console.log(error); 
      await t.rollback();
      throw error;
    }
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
        },
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

      subQuery: false,
    });

    return users;
  }


  /**
   * Update user
   */
 async update(userId: number, input: any) {
    const t = await User.sequelize.transaction();

    try {
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // 1️⃣ Update user master data
      const updatePayload: any = {
        full_name: input.full_name,
        username: input.username,
      };

      if (input.password) {
        updatePayload.password = await encryptPassword(input.password);
      }

      await user.update(updatePayload, { transaction: t });

      // 2️⃣ Update roles (replace all)
      if (Array.isArray(input.role_ids)) {
        await user.setRoles(input.role_ids, { transaction: t });
      }

      // 3️⃣ Update menus (replace all)
      if (Array.isArray(input.menu_ids)) {
        await user.setMenus(input.menu_ids, { transaction: t });
      }

      await t.commit();
      return user;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }



  /**
   * Delete user
   */
  async delete(userId: number) {
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      await user.destroy();
  
      return { success: true, userId };
    } catch (error) {
      console.log(error);
      throw error;
    }
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
        // user_type_id: user.user_type_id,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,

        roles: Array.from(roleMap.values()),
        menus: Array.from(menuMap.values()),
      };
    });
  }

}
