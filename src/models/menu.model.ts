import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import Role from './role.model';

/**
 * Attributes
 */
export interface MenuAttributes {
  menu_id?: number;
  menu_group_id: number;
  name: string;
  path: string;
  icon?: string;
  order?: number;
  status: 'active' | 'inactive';

  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Input type
 */
export interface MenuInput
  extends Optional<MenuAttributes, 'menu_id'> {}

/**
 * Model class
 */
class Menu
  extends Model<MenuAttributes, MenuInput>
  implements MenuAttributes
{
  public menu_id!: number;
  public menu_group_id!: number;
  public name!: string;
  public path!: string;
  public icon?: string;
  public order?: number;
  public status!: 'active' | 'inactive';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addRole!: BelongsToManyAddAssociationMixin<Role, number>;
  public addRoles!: BelongsToManyAddAssociationsMixin<Role, number>;
  public setRoles!: BelongsToManySetAssociationsMixin<Role, number>;
  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
}

/**
 * Init
 */
Menu.init(
  {
    menu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    menu_group_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'menu_groups',
        key: 'menu_group_id',
      },
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'menus',
    modelName: 'Menu',
    timestamps: true,
  },
);

export default Menu;
