import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';

/**
 * Attributes
 */
export interface RoleMenuAttributes {
  role_menu_id?: number;
  role_id: number;
  menu_id: number;

  createdAt?: Date;
}

/**
 * Input type
 */
export interface RoleMenuInput
  extends Optional<RoleMenuAttributes, 'role_menu_id'> {}

/**
 * Model class
 */
class RoleMenu
  extends Model<RoleMenuAttributes, RoleMenuInput>
  implements RoleMenuAttributes
{
  public role_menu_id!: number;
  public role_id!: number;
  public menu_id!: number;

  public readonly createdAt!: Date;
}

/**
 * Init
 */
RoleMenu.init(
  {
    role_menu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role_id',
      },
    },

    menu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'menu_id',
      },
    },

    createdAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'role_menus',
    modelName: 'RoleMenu',
    timestamps: true,
    updatedAt: false,
  },
);

export default RoleMenu;
