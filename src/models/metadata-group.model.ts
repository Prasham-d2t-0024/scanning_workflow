import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';

/**
 * Attributes
 */
export interface MetadataGroupAttributes {
  metadata_group_id: number;
  name: string;
  status: 'active' | 'inactive';

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Creation Input
 */
export interface MetadataGroupInput
  extends Optional<
    MetadataGroupAttributes,
    'metadata_group_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

/**
 * Output
 */
export interface MetadataGroupOutput extends MetadataGroupAttributes {}

/**
 * Model
 */
class MetadataGroup
  extends Model<MetadataGroupAttributes, MetadataGroupInput>
  implements MetadataGroupAttributes
{
  public metadata_group_id!: number;
  public name!: string;
  public status!: 'active' | 'inactive';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
MetadataGroup.init(
  {
    metadata_group_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    tableName: 'metadata_groups',
    modelName: 'MetadataGroup',
    timestamps: true,
    paranoid: true,
  }
);

export default MetadataGroup;
