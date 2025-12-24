import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import Process from '../models/process.model';
import { ProcessCreateDto, ProcessUpdateDto } from '../dto/process.dto';

@Injectable()
export default class ProcessService {
  /**
   * Create Process
   */
  async create(data: ProcessCreateDto) {
    // Optional: prevent duplicate webhook
    const existing = await Process.findOne({
      where: { webhook: data.webhook },
    });

    if (existing) {
      throw new ConflictException('Webhook already exists');
    }

    const process = await Process.create({
      name: data.name,
      webhook: data.webhook,
      status: data.status ?? 'active',
    });

    return process;
  }

  /**
   * Get all Processes
   */
  async findAll() {
    return Process.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get Process by ID
   */
  async findById(id: number) {
    const process = await Process.findByPk(id);

    if (!process) {
      throw new NotFoundException(`Process with ID ${id} not found`);
    }

    return process;
  }

  /**
   * Update Process
   */
  async update(id: number, data: ProcessUpdateDto) {
    const process = await this.findById(id);

    // Optional: prevent duplicate webhook on update
    if (data.webhook && data.webhook !== process.webhook) {
      const existing = await Process.findOne({
        where: { webhook: data.webhook },
      });

      if (existing) {
        throw new ConflictException('Webhook already exists');
      }
    }

    await process.update({
      name: data.name ?? process.name,
      webhook: data.webhook ?? process.webhook,
      status: data.status ?? process.status,
    });

    return process;
  }

  /**
   * Soft delete Process
   */
  async delete(id: number) {
    const process = await this.findById(id);
    await process.destroy(); // paranoid = true

    return { success: true, id };
  }
}
