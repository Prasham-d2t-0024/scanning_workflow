import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
import Role from '../models/role.model';
import { verifyPassword } from '../utils/password.util';
import { signToken } from '../utils/jwt';

/**
 * Login input DTO
 */
export interface LoginInput {
  username: string;
  password: string;
}

/**
 * Extend User type to include roles (Sequelize include)
 */
interface UserWithRoles extends User {
  roles: Role[];
}

@Injectable()
export default class AuthService {
  /**
   * Login User
   */
  async login(input: LoginInput) {
    const user = (await User.findOne({
      where: { username: input.username },
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] },
        },
      ],
    })) as UserWithRoles | null;

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValidPassword = await verifyPassword(
      input.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new Error('Invalid username or password');
    }

    const roles = user.roles.map((role) => role.name);

    const token = signToken({
      user_id: user.user_id,
      username: user.username,
      roles,
    });

    return {
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        roles,
      },
    };
  }
}
