import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import Batch from '../models/batch.model';
import { BatchCommitDto, BatchCreateDto, BatchUpdateDto } from '../dto/batch.dto';
import { fn, literal, Op, QueryTypes } from 'sequelize';
import Item, { ItemStatus } from 'src/models/item.model';

/**
 * Batch Service (Sequelize)
 */
@Injectable()
export default class BatchService {
  /**
   * Create Batch
   */
  async create(data: BatchCreateDto) {
    const batch = await Batch.create({
      bundle_name: data.name,
      // status: data.status ?? 'active',
    });

    return batch;
  }

  /**
   * Get All Batches
   */
  async findAll() {
    return Batch.findAll({
      // where: { status: 'active' },
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get Batch By ID
   */
  async findById(id: number) {
    const batch = await Batch.findByPk(id);

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }

    return batch;
  }

  /**
   * Update Batch
   */
  async update(id: number, data: BatchUpdateDto) {
    const batch = await Batch.findByPk(id);

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }

    await batch.update({
      bundle_name: data.name ?? batch.bundle_name,
      // status: data.status ?? batch.status,
    });

    return batch;
  }

  /**
   * Commit Batch
   */
  async commitBatch(data: BatchCommitDto, user: any) {
    const transaction = await Batch.sequelize.transaction();

    try {
      /**
       * 🔹 Step 1: Find all uncommitted batches for user
       */
      const batches = await Batch.findAll({
        where: {
          user_id: user.user_id,
          is_commited: false,
        },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (batches.length === 0) {
        throw new BadRequestException(
          'No uncommitted batch found for this user'
        );
      }

      if (batches.length > 1) {
        throw new BadRequestException(
          'Multiple uncommitted batches found. Please resolve before committing.'
        );
      }

      const batch = batches[0];

      /**
       * 🔹 Step 2: Get max sequence (global, prefix-independent)
       */
      const [rows] = await Batch.sequelize.query<
        { max_seq: number | null }[]
      >(
        "SELECT MAX(CAST(SPLIT_PART(bundle_name,'-',array_length(string_to_array(bundle_name,'-'),1)) AS INTEGER)) AS max_seq FROM batch WHERE bundle_name IS NOT NULL AND 'deletedAt' IS NULL",
        {
          transaction,
          type: QueryTypes.SELECT,
        }
      );

      const lastSeq = Number(rows[0]?.max_seq ?? 0);
      const nextSeq = (lastSeq + 1).toString().padStart(4, '0');

      /**
       * 🔹 Step 3: Build bundle name
       */
      const safeUsername = user.username
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase();

      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const prefix = `${safeUsername}`;
      const bundleName = `${prefix}-${today}-${nextSeq}`;

      /**
       * 🔹 Step 4: Commit batch
       */
      await batch.update(
        {
          is_commited: true,
          bundle_name: bundleName,
          batch_delivery_date: data.batch_delivery_date
            ? new Date(data.batch_delivery_date)
            : null,
        },
        { transaction }
      );

      /**
       * 🔹 Step 5: Commit only items of THIS batch
       */
      await Item.update(
        {
          item_status: ItemStatus.COMMITED,
        },
        {
          where: {
            batch_id: batch.batch_id,
            item_status: ItemStatus.NOT_COMMITED,
          },
          transaction,
        }
      );

      await transaction.commit();

      return {
        success: true,
        batch_id: batch.batch_id,
        bundle_name: bundleName,
      };
    } catch (error) {
      console.log("BATCH COMMIT ERROR ->", error);
      await transaction.rollback();
      throw error;
    }
  }



  /**
   * Soft Delete Batch
   */
  async delete(id: number) {
    const batch = await Batch.findByPk(id);

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }

    await batch.destroy(); // paranoid = true

    return { success: true, id };
  }
}
