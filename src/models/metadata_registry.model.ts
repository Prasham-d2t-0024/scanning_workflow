import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import ComponentType from './componenttype.model';

/**
 * Attributes
 */
export interface MetadataRegistryAttributes {
  metadata_registry_id?: number;
  key: string;
  isrequired: boolean;
  componenttype_id: number;
  ismultiple: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type
 */
export interface MetadataRegistryInput
  extends Optional<MetadataRegistryAttributes, 'metadata_registry_id'> {}

/**
 * Model class
 */
class MetadataRegistry
  extends Model<MetadataRegistryAttributes, MetadataRegistryInput>
  implements MetadataRegistryAttributes
{
  public metadata_registry_id!: number;
  public key!: string;
  public isrequired!: boolean;
  public componenttype_id!: number;
  public ismultiple!: boolean;

  // association (optional typing)
  public readonly componentType?: ComponentType;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
MetadataRegistry.init(
  {
    metadata_registry_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isrequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    componenttype_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'component_type',
        key: 'component_type_id',
      },
    },

    ismultiple: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'metadata_registry',
    modelName: 'MetadataRegistry',
    timestamps: true,
    paranoid: true,
  },
);


export default MetadataRegistry;
