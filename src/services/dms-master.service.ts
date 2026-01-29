import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import DmsMaster from '../models/dms-master.model';
import {
  DmsMasterCreateDto,
  DmsMasterUpdateDto,
} from '../dto/dms-master.dto';

@Injectable()
export default class DmsMasterService {
  /**
   * Create DMS
   */
  async create(data: DmsMasterCreateDto) {
    const existing = await DmsMaster.findOne({
      where: { endpoint: data.endpoint },
    });

    if (existing) {
      throw new ConflictException('DMS endpoint already exists');
    }

    return DmsMaster.create({
      endpoint: data.endpoint,
      isPrimary: data.isPrimary ?? false,
      active: data.active ?? true,
    });
  }

  /**
   * Get all DMS records
   */
  async findAll() {
    return DmsMaster.findAll({
      order: [['isPrimary', 'DESC'],['createdAt', 'DESC']],
    });
  }

  /**
   * Get DMS by ID
   */
  async findById(id: number) {
    const dms = await DmsMaster.findByPk(id);

    if (!dms) {
      throw new NotFoundException(`DMS with ID ${id} not found`);
    }

    return dms;
  }

  /**
   * Update DMS
   */
  async update(id: number, data: DmsMasterUpdateDto) {
    const dms = await this.findById(id);

    if (data.endpoint && data.endpoint !== dms.endpoint) {
      const existing = await DmsMaster.findOne({
        where: { endpoint: data.endpoint },
      });

      if (existing) {
        throw new ConflictException('DMS endpoint already exists');
      }
    }

    await dms.update({
      endpoint: data.endpoint ?? dms.endpoint,
      isPrimary: data.isPrimary ?? dms.isPrimary,
      active: data.active ?? dms.active,
    });

    return dms;
  }

  /**
   * Soft delete DMS
   */
  async delete(id: number) {
    const dms = await this.findById(id);
    await dms.destroy();

    return { success: true, id };
  }
}
