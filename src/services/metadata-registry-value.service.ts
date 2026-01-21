import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import MetadataRegistryValue from '../models/metadata_registry_value.model';
import MetadataRegistry from '../models/metadata_registry.model';
import {
  MetadataRegistryValueBulkCreateDto,
  MetadataRegistryValueCreateDto,
  MetadataRegistryValueUpdateDto,
} from '../dto/metadata-registry-value.dto';
import Item from 'src/models/item.model';
import { Op } from 'sequelize';

@Injectable()
export default class MetadataRegistryValueService {
  /**
   * Create MetadataRegistryValue
   */
  // async create(data: MetadataRegistryValueBulkCreateDto) {
  //   const items = data.items;

  //   if (!items.length) {
  //     return [];
  //   }

  //   const registryIds = [
  //     ...new Set(items.map(i => i.metadata_registry_id)),
  //   ];

  //   const registries = await MetadataRegistry.findAll({
  //     where: { metadata_registry_id: registryIds },
  //     attributes: ['metadata_registry_id'],
  //   });

  //   const foundIds = new Set(
  //     registries.map(r => r.metadata_registry_id),
  //   );

  //   const missing = registryIds.filter(id => !foundIds.has(id));
  //   if (missing.length) {
  //     throw new NotFoundException(
  //       `MetadataRegistry not found for IDs: ${missing.join(', ')}`,
  //     );
  //   }

  //   return MetadataRegistryValue.bulkCreate(
  //     items.map(item => ({
  //       metadata_registry_id: item.metadata_registry_id,
  //       value: item.value,
  //     })),
  //   );
  // }

  async create(
    data: MetadataRegistryValueBulkCreateDto,
  ) {
    const transaction = await Item.sequelize.transaction();

    try {
      const itemName = data.file_name;

      const item = await Item.create(
        { name: itemName },
        { transaction },
      );

      if (!item) {
        throw new BadRequestException('Item creation failed');
      }

        const metadataValues = data.items.map((entry) => ({
          item_id: item.item_id,
          metadata_registry_id: entry.metadata_registry_id,
          value: entry.value,
        }
      ));

      await MetadataRegistryValue.bulkCreate(metadataValues, {
        transaction,
      });

      await transaction.commit();

      return {
        success: true,
        item_id: item.item_id,
      };

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
