import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import MetadataRegistry from '../models/metadata_registry.model';
import ComponentType from '../models/componenttype.model';
import {
  MetadataRegistryCreateDto,
  MetadataRegistryUpdateDto,
} from '../dto/metadata-registry.dto';

@Injectable()
export default class MetadataRegistryService {
  /**
   * Create Metadata Registry
   */
  async create(data: MetadataRegistryCreateDto) {
    // ✅ validate component type reference
    // const componentType = await ComponentType.findByPk(
    //   data.componenttype_id,
    // );

    // if (!componentType) {
    //   throw new NotFoundException(
    //     `ComponentType with ID ${data.componenttype_id} not found`,
    //   );
    // }

    const existingComponentType = await MetadataRegistry.findOne({
      where: { key: data.key },
    });

    if (existingComponentType) {
      const allComponentTypes = await MetadataRegistry.findAll();
      const duplicateExists = allComponentTypes.some(
        (ct) => ct.key.toLowerCase() === data.key.toLowerCase()
      );

      if (duplicateExists) {
        throw new BadRequestException(
          `Metadata Registry with name '${data.key}' already exists`
        );
      }
    }

    return MetadataRegistry.create({
      key: data.key,
      isrequired: data.isrequired,
      componenttype_id: data.componenttype_id,
      ismultiple: data.ismultiple,
    });
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
      ],
      order: [['createdAt', 'DESC']],
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
      isrequired: data.isrequired ?? record.isrequired,
      componenttype_id:
        data.componenttype_id ?? record.componenttype_id,
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
}
