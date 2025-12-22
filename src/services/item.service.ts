import { Injectable, NotFoundException } from '@nestjs/common';
import Item from '../models/item.model';
import { ItemCreateDto, ItemUpdateDto } from '../dto/item.dto';

@Injectable()
export default class ItemService {
  /**
   * Create Item
   */
  async create(data: ItemCreateDto) {
    const item = await Item.create({
      name: data.name,
    });

    return item;
  }

  /**
   * Get all Items
   */
  async findAll() {
    return Item.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get Item by ID
   */
  async findById(id: number) {
    const item = await Item.findByPk(id);

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  /**
   * Update Item
   */
  async update(id: number, data: ItemUpdateDto) {
    const item = await this.findById(id);

    await item.update({
      name: data.name ?? item.name,
    });

    return item;
  }

  /**
   * Soft delete Item
   */
  async delete(id: number) {
    const item = await this.findById(id);
    await item.destroy(); // paranoid = true

    return { success: true, id };
  }
}
