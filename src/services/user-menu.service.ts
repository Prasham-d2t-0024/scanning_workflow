import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import UserMenu from '../models/user_menu.model';
import User from '../models/user.model';
import Menu from '../models/menu.model';
import {
  BulkCreateUserMenuDto,
  UpdateUserMenuDto,
} from '../dto/user-menu.dto';
import { MenuGroup, Role } from 'src/models';

@Injectable()
export default class UserMenuService {
  /**
   * Assign menus to user (bulk)
   */
  async create(data: BulkCreateUserMenuDto) {
    const t = await UserMenu.sequelize.transaction();

    try {
      const menus = await Menu.findAll({
        where: { menu_id: data.menu_ids },
        transaction: t,
      });

      if (menus.length !== data.menu_ids.length) {
        throw new NotFoundException('One or more menus not found');
      }

      // 3️⃣ Remove existing mappings (replace-all strategy)
      await UserMenu.destroy({
        where: { user_id: data.user_id },
        transaction: t,
      });

      // 4️⃣ Create new mappings
      await UserMenu.bulkCreate(
        data.menu_ids.map((menu_id) => ({
          user_id: data.user_id,
          menu_id,
        })),
        { transaction: t }
      );

      await t.commit();

      return {
        success: true,
        user_id: data.user_id,
        menu_ids: data.menu_ids,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  /**
   * Get all user-menu mappings
   */
  async findAll() {
    return UserMenu.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get user-menu mapping by ID
   */
  async findById(id: number) {
    const userMenu = await UserMenu.findByPk(id);
    console.log("userMenu",userMenu)
    // const userMenuIds = (userMenu).map((menu)=>menu.menu_id)
    const allMenus = await Menu.findAll();

    // const filteredUserMenu = allMenus.filter((menu)=>menu.menu_id.)

    if (!userMenu) {
      throw new NotFoundException(
        `UserMenu with ID ${id} not found`,
      );
    }

    return userMenu;
  }

  /**
   * Get menus by user
   */
  async findByUser(user_id: number) {
    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Menu,
          as: 'menus',
          through: {
            attributes: [], // hides user_menu join table
          },
          include: [
            {
              model: MenuGroup,
              as: 'menuGroup', // optional but usually needed
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    return user;
  }

  /**
   * Get users by menu
   */
  async findByMenu(menu_id: number) {
    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      throw new NotFoundException(
        `Menu with ID ${menu_id} not found`,
      );
    }

    return UserMenu.findAll({
      where: { menu_id },
    });
  }

  /**
   * Update user menus (replace all)
   */
  async update(user_id: number, data: UpdateUserMenuDto) {
    const t = await UserMenu.sequelize.transaction();

    try {
      // 1️⃣ Validate user
      const user = await User.findByPk(user_id, { transaction: t });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${user_id} not found`,
        );
      }

      // 2️⃣ Validate menus
      const menus = await Menu.findAll({
        where: { menu_id: data.menu_ids },
        transaction: t,
      });

      if (menus.length !== data.menu_ids.length) {
        throw new NotFoundException('One or more menus not found');
      }

      // 3️⃣ Remove existing mappings
      await UserMenu.destroy({
        where: { user_id },
        transaction: t,
      });

      // 4️⃣ Insert new mappings
      await UserMenu.bulkCreate(
        data.menu_ids.map((menu_id) => ({
          user_id,
          menu_id,
        })),
        { transaction: t }
      );

      await t.commit();

      return {
        success: true,
        user_id,
        menu_ids: data.menu_ids,
      };
    } catch (error) {
      await t.rollback();
      throw new InternalServerErrorException(
        'Failed to update user-menu mapping',
      );
    }
  }

  /**
   * Delete single user-menu mapping
   */
  async delete(id: number) {
    const userMenu = await this.findById(id);
    await userMenu.destroy();

    return { success: true, id };
  }
}
