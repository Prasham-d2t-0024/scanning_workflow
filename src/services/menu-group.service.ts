import { Injectable, NotFoundException } from '@nestjs/common';
import MenuGroup from '../models/menu_group.model';
import {
  CreateMenuGroupDto,
  UpdateMenuGroupDto,
} from '../dto/menu-group.dto';

@Injectable()
export default class MenuGroupService {
  /**
   * Create Menu Group
   */
  async create(data: CreateMenuGroupDto) {
    return MenuGroup.create({
      name: data.name,
      order: data.order,
      status: data.status,
    });
  }

  /**
   * Get all Menu Groups
   */
  async findAll() {
    return MenuGroup.findAll({
      order: [['order', 'ASC']],
    });
  }

  /**
   * Get Menu Group by ID
   */
  async findById(menuGroupId: number) {
    const group = await MenuGroup.findByPk(menuGroupId);

    if (!group) {
      throw new NotFoundException(
        `MenuGroup with ID ${menuGroupId} not found`,
      );
    }

    return group;
  }

  /**
   * Update Menu Group
   */
  async update(
    menuGroupId: number,
    data: UpdateMenuGroupDto,
  ) {
    const group = await this.findById(menuGroupId);

    await group.update({
      name: data.name ?? group.name,
      order: data.order ?? group.order,
      status: data.status ?? group.status,
    });

    return group;
  }

  /**
   * Delete Menu Group
   */
  async delete(menuGroupId: number) {
    const group = await this.findById(menuGroupId);
    await group.destroy();

    return { success: true, id: menuGroupId };
  }
}
