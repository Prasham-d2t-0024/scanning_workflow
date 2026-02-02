import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import MetadataRegistry from './metadata_registry.model';

/**
 * Attributes
 */
export interface MetadataRegistryValueAttributes {
  metadata_registry_value_id?: number;
  metadata_registry_id: number;
  value: string | number;
  item_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type
 */
export interface MetadataRegistryValueInput
  extends Optional<
    MetadataRegistryValueAttributes,
    'metadata_registry_value_id'
  > {}

/**
 * Model class
 */
class MetadataRegistryValue
  extends Model<
    MetadataRegistryValueAttributes,
    MetadataRegistryValueInput
  >
  implements MetadataRegistryValueAttributes
{
  public metadata_registry_value_id!: number;
  public metadata_registry_id!: number;
  public value!: string | number;
  public item_id!: number;
  
  public readonly metadataRegistry?: MetadataRegistry;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
MetadataRegistryValue.init(
  {
    metadata_registry_value_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    metadata_registry_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'metadata_registry',
        key: 'metadata_registry_id',
      },
    },

    value: {
      type: DataTypes.TEXT || DataTypes.NUMBER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'items',
        key: 'id',
      },
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'metadata_registry_values',
    modelName: 'MetadataRegistryValue',
    timestamps: true,
    paranoid: true,
  },
);

export default MetadataRegistryValue;
