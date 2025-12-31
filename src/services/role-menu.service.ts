import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import RoleMenu from '../models/role_menu.model';
import Role from '../models/role.model';
import Menu from '../models/menu.model';
import {
  CreateRoleMenuDto,
  RoleMenuCreateDto,
  UpdateRoleMenuDto,
} from '../dto/role-menu.dto';

@Injectable()
export default class RoleMenuService {
  /**
   * Assign menu to role
   */
  async create(data: RoleMenuCreateDto) {
    const t = await RoleMenu.sequelize.transaction();

    try {
      const menu = await Menu.create(
        {
          menu_group_id: data.menu_group_id,
          name: data.name,
          path: data.path,
          icon: data.icon,
          status: data.status,
        },
        { transaction: t }
      );

      await RoleMenu.bulkCreate(
        data.role_ids.map((roleId) => ({
          role_id: Number(roleId),
          menu_id: menu.menu_id,
        })),
        { transaction: t }
      );

      await t.commit();

      return {
        success: true,
        menu: menu.get({ plain: true }),
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  /**
   * Get all role-menu mappings
   */
  async findAll() {
    return RoleMenu.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get role-menu by ID
   */
  async findById(id: number) {
    const roleMenu = await RoleMenu.findByPk(id);

    if (!roleMenu) {
      throw new NotFoundException(
        `RoleMenu with ID ${id} not found`,
      );
    }

    return roleMenu;
  }

  /**
   * Get menus by role
   */
  async findByRole(role_id: number) {
    const role = await Role.findByPk(role_id);
    if (!role) {
      throw new NotFoundException(
        `Role with ID ${role_id} not found`,
      );
    }

    return RoleMenu.findAll({
      where: { role_id },
    });
  }

  findByMenuId(menu_id: number) {
    return RoleMenu.findAll({
      where: { menu_id },
    });
  }

  /**
   * Update role-menu mapping
   */
  async update(menuId: number, data: UpdateRoleMenuDto) {
    const t = await RoleMenu.sequelize.transaction();

    try {
      // 1️⃣ Fetch menu
      const menu = await Menu.findByPk(menuId, { transaction: t });

      if (!menu) {
        throw new Error('Menu not found');
      }

      // 2️⃣ Update menu fields
      await menu.update(
        {
          menu_group_id: data.menu_group_id,
          name: data.name,
          path: data.path,
          icon: data.icon,
          status: data.status,
        },
        { transaction: t }
      );

      // 3️⃣ Get existing role-menu mappings for this menu
      const existingMappings = await RoleMenu.findAll({
        where: { menu_id: menuId },
        transaction: t,
      });

      const existingRoleIds = existingMappings.map(m => m.role_id);
      const incomingRoleIds = data.role_ids.map(Number);

      // 4️⃣ Find roles to ADD
      const rolesToAdd = incomingRoleIds.filter(
        roleId => !existingRoleIds.includes(roleId)
      );

      // 5️⃣ Find roles to REMOVE
      const rolesToRemove = existingRoleIds.filter(
        roleId => !incomingRoleIds.includes(roleId)
      );

      // 6️⃣ Remove only necessary mappings
      if (rolesToRemove.length > 0) {
        await RoleMenu.destroy({
          where: {
            menu_id: menuId,
            role_id: rolesToRemove,
          },
          transaction: t,
        });
      }

      // 7️⃣ Add missing mappings
      if (rolesToAdd.length > 0) {
        await RoleMenu.bulkCreate(
          rolesToAdd.map(roleId => ({
            role_id: roleId,
            menu_id: menuId,
          })),
          { transaction: t }
        );
      }

      // 8️⃣ Commit
      await t.commit();

      return {
        success: true,
        menu: menu.get({ plain: true }),
        roles: incomingRoleIds,
      };
    } catch (error) {
      await t.rollback();
      throw new InternalServerErrorException(
        'Failed to update role-menu mapping'
      );
    }
  }


  /**
   * Delete role-menu mapping
   */
  async delete(id: number) {
    const roleMenu = await this.findById(id);
    await roleMenu.destroy();

    return { success: true, id };
  }
}
