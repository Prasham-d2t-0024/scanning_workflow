import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import ComponentType from './componenttype.model';
import Dropdown from './dropdown.model';
import MetadataGroup from './metadata-group.model';

/**
 * Attributes
 */
export interface MetadataRegistryAttributes {
  metadata_registry_id?: number;
  key: string;
  title: string;
  isrequired: boolean;
  componenttype_id: number;
  dropdown_id: number;
  ismultiple: boolean;
  metadataOrder: number
  metadata_group_id: number;

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
  public title!: string;
  public isrequired!: boolean;
  public componenttype_id!: number;
  public dropdown_id!: number;
  public ismultiple!: boolean;
  public metadataOrder!: number;
  public metadata_group_id: number;

  // association (optional typing)
  public readonly componentType?: ComponentType;
  //association
  public readonly metadataGroup?: MetadataGroup;
  public readonly dropdown?: Dropdown

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
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
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

    dropdown_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dropdowns',
        key: 'dropdown_id',
      },
    },

    ismultiple: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    metadataOrder: {
      field: 'metadata_order',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    metadata_group_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'metadata_groups',
        key: 'metadata_group_id',
      },
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
