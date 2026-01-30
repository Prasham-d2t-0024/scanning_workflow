import { Injectable, NotFoundException } from '@nestjs/common';
import Item, { ItemStatus } from '../models/item.model';
import { ItemCreateDto, ItemUpdateDto } from '../dto/item.dto';
import Batch from 'src/models/batch.model';
import { Transaction } from 'sequelize';

@Injectable()
export default class ItemService {
  /**
   * Create Item
   */
  async create(
    data: ItemCreateDto,
    userId: number,
    transaction?: Transaction,
  ) {
    const tx = transaction ?? await Item.sequelize.transaction();

    try {
      // Try to find active (uncommitted) batch for user
      let batch = await Batch.findOne({
        where: {
          user_id: userId,
          is_commited: false,
        },
        transaction: tx,
        lock: tx.LOCK.UPDATE, // important for concurrency
      });

      // If not found → create new batch
      if (!batch) {
        batch = await Batch.create(
          {
            user_id: userId,
            bundle_name: '',
            is_commited: false,
          },
          { transaction: tx }
        );
      }

      // Create item under that batch
      const item = await Item.create(
        {
          name: data.name,
          batch_id: batch.batch_id,
        },
        { transaction: tx }
      );

      if (!transaction) await tx.commit();

      return {
        success: true,
        item_id: item.item_id,
        batch_id: batch.batch_id,
      };
    } catch (err) {
      if (!transaction) await tx.rollback();
      throw err;
    }
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
   * Get all uncommitted items for a user
   */
 async findUserUncommittedItems(userId: number) {
    const rows = await Item.findAll({
      where: {
        item_status: ItemStatus.NOT_COMMITED,
      },
      include: [
        {
          model: Batch,
          as: 'batch',
          required: true,
          where: {
            user_id: userId,
            is_commited: false,
          },
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!rows.length) {
      return {
        batch: null,
        items: [],
      };
    }

    // Batch info is same for all items → take from first row
    const { batch } = rows[0];

    // Extract only item-level fields
    const items = rows.map(item => ({
      item_id: item.item_id,
      name: item.name,
      item_status: item.item_status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return {
      batch: {
        batch_id: batch.batch_id,
        bundle_name: batch.bundle_name,
        batch_delivery_date: batch.batch_delivery_date,
        is_commited: batch.is_commited,
        user_id: batch.user_id,
        createdAt: batch.createdAt,
        updatedAt: batch.updatedAt,
      },
      items,
    };
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
