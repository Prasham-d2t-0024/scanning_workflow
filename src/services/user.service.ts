import { Injectable, NotFoundException } from '@nestjs/common';
import User from '../models/user.model';
import UserRole from '../models/user_role.model';
import { encryptPassword } from '../utils/password.util';

@Injectable()
export default class UserService {
  /**
   * Create user
   */
  async create(input: any) {
    const hashedPassword = await encryptPassword(input.password);

    const user = await User.create({
      full_name: input.full_name,
      username: input.username,
      password: hashedPassword,
      user_type_id: input.user_type_id,
    });

    if (input.role_ids?.length) {
      await UserRole.bulkCreate(
        input.role_ids.map((role_id: number) => ({
          user_id: user.user_id,
          role_id,
        })),
      );
    }

    return user;
  }

  /**
   * Get all users
   */
  async findAll() {
    return User.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  /**
   * Update user
   */
  async update(userId: number, input: any) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (input.password) {
      input.password = await encryptPassword(input.password);
    }

    await user.update(input);
    return user;
  }

  /**
   * Delete user
   */
  async delete(userId: number) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.destroy();

    return { success: true, userId };
  }
}
