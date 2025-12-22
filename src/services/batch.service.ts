import { Injectable, NotFoundException } from '@nestjs/common';
import Batch from '../models/batch.model';
import { BatchCreateDto, BatchUpdateDto } from '../dto/batch.dto';

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
      name: data.name,
      status: data.status ?? 'active',
    });

    return batch;
  }

  /**
   * Get All Batches
   */
  async findAll() {
    return Batch.findAll({
      where: { status: 'active' },
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
      name: data.name ?? batch.name,
      status: data.status ?? batch.status,
    });

    return batch;
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
