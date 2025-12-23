import { Injectable, NotFoundException } from '@nestjs/common';
import RoleMenu from '../models/role_menu.model';
import Role from '../models/role.model';
import Menu from '../models/menu.model';
import {
  CreateRoleMenuDto,
  UpdateRoleMenuDto,
} from '../dto/role-menu.dto';

@Injectable()
export default class RoleMenuService {
  /**
   * Assign menu to role
   */
  async create(data: CreateRoleMenuDto) {
    // ✅ validate role exists
    const role = await Role.findByPk(data.role_id);
    if (!role) {
      throw new NotFoundException(
        `Role with ID ${data.role_id} not found`,
      );
    }

    // ✅ validate menu exists
    const menu = await Menu.findByPk(data.menu_id);
    if (!menu) {
      throw new NotFoundException(
        `Menu with ID ${data.menu_id} not found`,
      );
    }

    return RoleMenu.create({
      role_id: data.role_id,
      menu_id: data.menu_id,
    });
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

  /**
   * Update role-menu mapping
   */
  async update(id: number, data: UpdateRoleMenuDto) {
    const roleMenu = await this.findById(id);

    await roleMenu.update({
      role_id: data.role_id ?? roleMenu.role_id,
      menu_id: data.menu_id ?? roleMenu.menu_id,
    });

    return roleMenu;
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
