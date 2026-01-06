import { Injectable, NotFoundException } from '@nestjs/common';
import Menu from '../models/menu.model';
import {
  CreateMenuDto,
  UpdateMenuDto,
} from '../dto/menu.dto';
import { MenuGroup, Role } from 'src/models';

@Injectable()
export default class MenuService {
  /**
   * Create Menu
   */
  async create(data: CreateMenuDto) {
    const menu = await Menu.create({
      menu_group_id: data.menu_group_id,
      name: data.name,
      path: data.path,
      icon: data.icon,
      status: data.status,
    });

    if (data.roleIds && data.roleIds.length > 0) {
      await menu.addRoles(data.roleIds);
    }

    return menu;
  }
  async assignRoles(menuId: number, roleIds: number[]) {
    const menu = await this.findById(menuId);

    await menu.setRoles(roleIds); // replaces existing roles

    return { success: true };
  }
  /**
   * Get all menus
   */
  async findAll() {
    return Menu.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] },
        },
        {
          model: MenuGroup,
          as: 'menuGroup',
        },
      ],
      order: [['order', 'ASC']],
    });
  }

  /**
   * Get menu by ID
   */
  async findById(id: number) {
    const menu = await Menu.findByPk(id, {
      include: [{ model: Role, as: 'roles' }, {model: MenuGroup,as: 'menuGroup',}],
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  /**
   * Update menu
   */
  async update(id: number, data: UpdateMenuDto) {
    const menu = await this.findById(id);

    await menu.update({
      menu_group_id: data.menu_group_id ?? menu.menu_group_id,
      name: data.name ?? menu.name,
      path: data.path ?? menu.path,
      icon: data.icon ?? menu.icon,
      status: data.status ?? menu.status,
    });

    if (data.roleIds && data.roleIds.length > 0) {
      await menu.setRoles(data.roleIds);
    }
    return menu;
  }

  /**
   * Delete menu
   */
  async delete(id: number) {
    const menu = await this.findById(id);
    await menu.destroy();

    return { success: true, id };
  }
}
