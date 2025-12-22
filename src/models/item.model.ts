import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';

/**
 * Attributes
 */
export interface ItemAttributes {
  item_id?: number;
  name: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type
 */
export interface ItemInput
  extends Optional<ItemAttributes, 'item_id'> {}

/**
 * Model class
 */
class Item
  extends Model<ItemAttributes, ItemInput>
  implements ItemAttributes
{
  public item_id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
Item.init(
  {
    item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'items',
    modelName: 'Item',
    timestamps: true,
    paranoid: true,
  },
);

export default Item;
