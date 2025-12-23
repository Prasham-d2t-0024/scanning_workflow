import { Injectable, NotFoundException } from '@nestjs/common';
import MetadataRegistryValue from '../models/metadata_registry_value.model';
import MetadataRegistry from '../models/metadata_registry.model';
import {
  MetadataRegistryValueCreateDto,
  MetadataRegistryValueUpdateDto,
} from '../dto/metadata-registry-value.dto';

@Injectable()
export default class MetadataRegistryValueService {
  /**
   * Create MetadataRegistryValue
   */
  async create(data: MetadataRegistryValueCreateDto) {
    // ✅ validate metadata registry exists
    const metadataRegistry = await MetadataRegistry.findByPk(
      data.metadata_registry_id,
    );

    if (!metadataRegistry) {
      throw new NotFoundException(
        `MetadataRegistry with ID ${data.metadata_registry_id} not found`,
      );
    }

    return MetadataRegistryValue.create({
      metadata_registry_id: data.metadata_registry_id,
      value: data.value,
    });
  }

  /**
   * Get all MetadataRegistryValues
   */
  async findAll() {
    return MetadataRegistryValue.findAll({
      include: [
        {
          model: MetadataRegistry,
          as: 'metadataRegistry',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get MetadataRegistryValue by ID
   */
  async findById(id: number) {
    const value = await MetadataRegistryValue.findByPk(id, {
      include: [
        {
          model: MetadataRegistry,
          as: 'metadataRegistry',
        },
      ],
    });

    if (!value) {
      throw new NotFoundException(
        `MetadataRegistryValue with ID ${id} not found`,
      );
    }

    return value;
  }

  /**
   * Get values by MetadataRegistry ID
   */
  async findByMetadataRegistry(metadata_registry_id: number) {
    const registry = await MetadataRegistry.findByPk(
      metadata_registry_id,
    );

    if (!registry) {
      throw new NotFoundException(
        `MetadataRegistry with ID ${metadata_registry_id} not found`,
      );
    }

    return MetadataRegistryValue.findAll({
      where: { metadata_registry_id },
      order: [['createdAt', 'ASC']],
    });
  }

  /**
   * Update MetadataRegistryValue
   */
  async update(
    id: number,
    data: MetadataRegistryValueUpdateDto,
  ) {
    const value = await this.findById(id);

    await value.update({
      value: data.value ?? value.value,
    });

    return value;
  }

  /**
   * Soft delete MetadataRegistryValue
   */
  async delete(id: number) {
    const value = await this.findById(id);
    await value.destroy(); // paranoid = true

    return { success: true, id };
  }
}
