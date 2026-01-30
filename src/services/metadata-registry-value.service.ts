import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import MetadataRegistryValue from '../models/metadata_registry_value.model';
import MetadataRegistry from '../models/metadata_registry.model';
import {
  MetadataRegistryValueBulkCreateDto,
  MetadataRegistryValueBulkUpdateDto,
  MetadataRegistryValueUpdateDto,
} from '../dto/metadata-registry-value.dto';
import Item from 'src/models/item.model';
import ItemService from './item.service';

@Injectable()
export default class MetadataRegistryValueService {

  constructor(protected itemSerivce: ItemService){}
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

 async create(data: MetadataRegistryValueBulkCreateDto, userId:any) {
  const transaction = await MetadataRegistryValue.sequelize.transaction();

  try {
    let itemId = data.item_id;

    // 🔹 CASE 1: item_id not provided → create new item (old behavior)
    if (!itemId) {
      if (!data.file_name) {
        throw new BadRequestException('file_name is required when creating a new item');
      }

      const itemResult = await this.itemSerivce.create(
        { name: data.file_name },
         userId, 
        transaction
      );

      itemId = itemResult.item_id;
    }
    // 🔹 CASE 2: item_id provided → validate item exists
    else {
      const existingItem = await Item.findByPk(itemId, { transaction });
      if (!existingItem) {
        throw new NotFoundException(`Item with ID ${itemId} not found`);
      }
    }

    // 🔹 Process metadata values (UPSERT logic)
    for (const entry of data.items) {
      const existingValue = await MetadataRegistryValue.findOne({
        where: {
          item_id: itemId,
          metadata_registry_id: entry.metadata_registry_id,
        },
        transaction,
      });

      if (existingValue) {
        // UPDATE
        await existingValue.update(
          { value: entry.value },
          { transaction }
        );
      } else {
        // INSERT
        await MetadataRegistryValue.create(
          {
            item_id: itemId,
            metadata_registry_id: entry.metadata_registry_id,
            value: entry.value,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return {
      success: true,
      item_id: itemId,
    };
  } catch (error) {
    console.log("METADATA REGISTERY CRATE ERROR -> ", error)
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
 * Get MetadataRegistryValues by Item ID
 * @param itemId Item ID
 */
  async findByItemId(itemId: number) {
    return MetadataRegistryValue.findAll({
      where: {
        item_id: itemId,
      },
      include: [
        {
          model: MetadataRegistry,
          as: 'metadataRegistry',
        },
      ],
      order: [['createdAt', 'DESC']],
    })
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
  // async update(
  //   id: number,
  //   data: MetadataRegistryValueUpdateDto,
  // ) {
  //   const value = await this.findById(id);

  //   await value.update({
  //     value: data.value ?? value.value,
  //   });

  //   return value;
  // }

  /**
   * Soft delete MetadataRegistryValue
   */
  async delete(id: number) {
    const value = await this.findById(id);
    await value.destroy(); // paranoid = true

    return { success: true, id };
  }

  /**
 * Bulk update MetadataRegistryValues by metadata_registry_value_id
 */
   async update(data: MetadataRegistryValueBulkUpdateDto) {
    const transaction = await MetadataRegistryValue.sequelize.transaction();

    try {
      const ids = data.items.map(i => i.metadata_registry_value_id);

      const existing = await MetadataRegistryValue.findAll({
        where: { metadata_registry_value_id: ids },
        attributes: ['metadata_registry_value_id'],
        transaction,
      });

      if (existing.length !== ids.length) {
        throw new NotFoundException(
          'One or more MetadataRegistryValues not found',
        );
      }

      await Promise.all(
        data.items.map(item =>
          MetadataRegistryValue.update(
            { value: item.value },
            {
              where: {
                metadata_registry_value_id: item.metadata_registry_value_id,
              },
              transaction,
            },
          )
        )
      ).then((resp)=>{
        console.log("3333333333",resp);
      }).catch((err)=>{
        console.log("7777777777",err);
      })

      await transaction.commit();

      return {
        success: true,
        updatedCount: data.items.length,
      };
    } catch (error) {
      console.log("=======",error);
      await transaction.rollback();
      throw error;
    }
  }
}
