import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';

/**
 * Attributes
 */
export interface MenuGroupAttributes {
  menu_group_id?: number;
  name: string;
  order?: number;
  status: 'active' | 'inactive';

  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Input type
 */
export interface MenuGroupInput
  extends Optional<MenuGroupAttributes, 'menu_group_id'> {}

/**
 * Model class
 */
class MenuGroup
  extends Model<MenuGroupAttributes, MenuGroupInput>
  implements MenuGroupAttributes
{
  public menu_group_id!: number;
  public name!: string;
  public order?: number;
  public status!: 'active' | 'inactive';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Init
 */
MenuGroup.init(
  {
    menu_group_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
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
    tableName: 'menu_groups',
    modelName: 'MenuGroup',
    timestamps: true,
  },
);

export default MenuGroup;
