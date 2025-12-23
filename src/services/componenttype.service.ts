import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import ComponentType from '../models/componenttype.model';
import { ComponentTypeCreateDto } from '../dto/componenttype.dto';


/**
 * ComponentType Service (Sequelize)
 */
@Injectable()
export default class ComponentTypeService {
  /**
   * Create Component Type
   */
  async create(data: ComponentTypeCreateDto) {
    // Check for duplicate name (case-insensitive)
    const existingComponentType = await ComponentType.findOne({
      where: { name: data.name },
    });

    if (existingComponentType) {
      const allComponentTypes = await ComponentType.findAll();
      const duplicateExists = allComponentTypes.some(
        (ct) => ct.name.toLowerCase() === data.name.toLowerCase()
      );

      if (duplicateExists) {
        throw new BadRequestException(
          `ComponentType with name '${data.name}' already exists`
        );
      }
    }

    const componentType = await ComponentType.create({
      name: data.name,
      status: data.status ?? 'active',
    });

    return componentType;
  }

  /**
   * Get All Component Types
   */
  async findAll() {
    return ComponentType.findAll({
      where: { status: 'active' },
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get Component Type By ID
   */
  async findById(id: number) {
    const componentType = await ComponentType.findByPk(id);

    if (!componentType) {
      throw new NotFoundException(
        `ComponentType with ID ${id} not found`,
      );
    }

    return componentType;
  }

  /**
   * Update Component Type
   */
  async update(id: number, data: ComponentTypeCreateDto) {
    const componentType = await ComponentType.findByPk(id);

    if (!componentType) {
      throw new NotFoundException(
        `ComponentType with ID ${id} not found`,
      );
    }

    await componentType.update({
      name: data.name ?? componentType.name,
      status: data.status ?? componentType.status,
    });

    return componentType;
  }

  /**
   * Soft Delete Component Type
   */
  async delete(id: number) {
    const componentType = await ComponentType.findByPk(id);

    if (!componentType) {
      throw new NotFoundException(
        `ComponentType with ID ${id} not found`,
      );
    }

    await componentType.destroy(); // paranoid = true

    return { success: true, id };
  }
}
