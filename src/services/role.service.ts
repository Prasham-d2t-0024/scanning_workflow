import { Injectable, NotFoundException } from '@nestjs/common';
import Role from '../models/role.model';
import { RoleCreateDto, RoleUpdateDto } from '../dto/role.dto';

@Injectable()
export default class RoleService {
  /**
   * Create Role
   */
  async create(data: RoleCreateDto) {
    const role = await Role.create({
      name: data.name,
      description: data.description,
      status: data.status ?? 'active',
    });

    return role;
  }

  /**
   * Get all Roles
   */
  async findAll() {
    return Role.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get Role by ID
   */
  async findById(id: number) {
    const role = await Role.findByPk(id);

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  /**
   * Update Role
   */
  async update(id: number, data: RoleUpdateDto) {
    const role = await this.findById(id);

    await role.update({
      name: data.name ?? role.name,
      description: data.description ?? role.description,
      status: data.status ?? role.status,
    });

    return role;
  }

  /**
   * Soft delete Role
   */
  async delete(id: number) {
    const role = await this.findById(id);
    await role.destroy(); // paranoid = true

    return { success: true, id };
  }
}
