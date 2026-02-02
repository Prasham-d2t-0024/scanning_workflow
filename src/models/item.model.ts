import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import Batch from './batch.model';
import MetadataRegistryValue from './metadata_registry_value.model';
import MetadataRegistry from './metadata_registry.model';

export enum ItemStatus {
  NOT_COMMITED = -1,
  COMMITED = 0,
}

/**
 * Attributes
 */
export interface ItemAttributes {
  item_id?: number;
  name: string;
  batch_id: number;
  item_status:ItemStatus;

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
  public batch_id: number;
  public item_status: ItemStatus;

  public batch?: Batch;
  public readonly metadataValues?: MetadataRegistryValue[];
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

    batch_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'batch',      // table name
        key: 'batch_id',
      },
    },

    item_status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: ItemStatus.NOT_COMMITED,
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
