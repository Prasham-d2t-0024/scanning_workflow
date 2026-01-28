import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import MetadataGroup from '../models/metadata-group.model';
import {
  MetadataGroupCreateDto,
  MetadataGroupUpdateDto,
} from '../dto/metadata-group.dto';

@Injectable()
export default class MetadataGroupService {
  /**
   * Create Metadata Group
   */
  async create(data: MetadataGroupCreateDto) {
    const existing = await MetadataGroup.findOne({
      where: { name: data.name },
    });

    if (existing) {
      throw new ConflictException('Metadata group already exists');
    }

    return MetadataGroup.create({
      name: data.name,
      status: data.status ?? 'active',
    });
  }

  /**
   * Get all Metadata Groups
   */
  async findAll() {
    return MetadataGroup.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get Metadata Group by ID
   */
  async findById(id: number) {
    const metadataGroup = await MetadataGroup.findByPk(id);

    if (!metadataGroup) {
      throw new NotFoundException(
        `Metadata Group with ID ${id} not found`,
      );
    }

    return metadataGroup;
  }

  /**
   * Update Metadata Group
   */
  async update(id: number, data: MetadataGroupUpdateDto) {
    const metadataGroup = await this.findById(id);

    if (data.name && data.name !== metadataGroup.name) {
      const existing = await MetadataGroup.findOne({
        where: { name: data.name },
      });

      if (existing) {
        throw new ConflictException('Metadata group already exists');
      }
    }

    await metadataGroup.update({
      name: data.name ?? metadataGroup.name,
      status: data.status ?? metadataGroup.status,
    });

    return metadataGroup;
  }

  /**
   * Soft delete Metadata Group
   */
  async delete(id: number) {
    const metadataGroup = await this.findById(id);
    await metadataGroup.destroy();

    return { success: true, id };
  }
}
