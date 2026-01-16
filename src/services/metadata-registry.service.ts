import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import MetadataRegistry from '../models/metadata_registry.model';
import ComponentType from '../models/componenttype.model';
import {
  MetadataRegistryCreateDto,
  MetadataRegistryUpdateDto,
} from '../dto/metadata-registry.dto';
import Dropdown from 'src/models/dropdown.model';

@Injectable()
export default class MetadataRegistryService {
  /**
   * Create Metadata Registry
   */
  async create(data: MetadataRegistryCreateDto) {
    const t = await MetadataRegistry.sequelize.transaction();

    try {
      const existing = await MetadataRegistry.findOne({
        where: { key: data.key },
        transaction: t,
      });

      if (existing) {
        throw new BadRequestException(
          `Metadata Registry with name '${data.key}' already exists`
        );
      }

      const maxOrder =
      (await MetadataRegistry.max('metadataOrder', { transaction: t })) ?? 0;

      const record = await MetadataRegistry.create(
        {
          key: data.key,
          title: data.title,
          isrequired: data.isrequired,
          componenttype_id: data.componenttype_id,
          ismultiple: data.ismultiple,
          metadataOrder: Number(maxOrder) + 1,
        },
        { transaction: t }
      );

      await t.commit();
      return record;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }


  /**
   * Get all Metadata Registry entries
   */
  async findAll() {
    return MetadataRegistry.findAll({
      include: [
        {
          model: ComponentType,
          as: 'componentType',
        },
        {
          model:Dropdown,
          as:'dropdown'
        }
      ],
      order: [['metadataOrder', 'ASC']],
    });
  }

  /**
   * Get Metadata Registry by ID
   */
  async findById(id: number) {
    const record = await MetadataRegistry.findByPk(id, {
      include: [
        {
          model: ComponentType,
          as: 'componentType',
        },
      ],
    });

    if (!record) {
      throw new NotFoundException(
        `MetadataRegistry with ID ${id} not found`,
      );
    }

    return record;
  }

  /**
   * Get Metadata by ComponentType ID
   */
  async findByComponentType(componenttype_id: number) {
    const componentType = await ComponentType.findByPk(componenttype_id);

    if (!componentType) {
      throw new NotFoundException(
        `ComponentType with ID ${componenttype_id} not found`,
      );
    }

    return MetadataRegistry.findAll({
      where: { componenttype_id },
      order: [['createdAt', 'ASC']],
    });
  }

  /**
   * Update Metadata Registry
   */
  async update(id: number, data: MetadataRegistryUpdateDto) {
    const record = await this.findById(id);

    await record.update({
      key: data.key ?? record.key,
      title: data.title ?? record.title,
      isrequired: data.isrequired ?? record.isrequired,
      componenttype_id:data.componenttype_id ?? record.componenttype_id,
      dropdown_id:data.dropdown_id ?? record.dropdown_id,
      ismultiple: data.ismultiple ?? record.ismultiple,
    });

    return record;
  }

  /**
   * Soft delete Metadata Registry
   */
  async delete(id: number) {
    const record = await this.findById(id);
    await record.destroy(); // paranoid = true

    return { success: true, id };
  }

  async findbyKey(key: string) {
    const record = await MetadataRegistry.findOne({
      where: { key },
      include: [
        {
          model: ComponentType,
          as: 'componentType',
        },
      ],
    });

    return record;
  }
  async metadataReorder(items: { metadata_registry_id: number; metadataOrder: number }[]) {
    if (!items.length) {
      throw new BadRequestException('Reorder list cannot be empty');
    }

    const transaction = await MetadataRegistry.sequelize.transaction();

    try {
      for (const item of items) {
        await MetadataRegistry.update(
          { metadataOrder: item.metadataOrder },
          {
            where: { metadata_registry_id: item.metadata_registry_id },
            transaction,
          }
        );
      }

      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

}
