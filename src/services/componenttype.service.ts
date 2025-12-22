import { Injectable, NotFoundException } from '@nestjs/common';
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
