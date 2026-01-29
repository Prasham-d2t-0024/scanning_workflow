import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';

/**
 * Attributes
 */
export interface DmsMasterAttributes {
  dms_id: number;
  endpoint: string;
  isPrimary: boolean;
  active: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Creation Input
 */
export interface DmsMasterInput
  extends Optional<
    DmsMasterAttributes,
    'dms_id' | 'isPrimary' | 'active' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

/**
 * Output
 */
export interface DmsMasterOutput extends DmsMasterAttributes {}

/**
 * Model
 */
class DmsMaster
  extends Model<DmsMasterAttributes, DmsMasterInput>
  implements DmsMasterAttributes
{
  public dms_id!: number;
  public endpoint!: string;
  public isPrimary!: boolean;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
DmsMaster.init(
  {
    dms_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    endpoint: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    tableName: 'dms_masters',
    modelName: 'DmsMaster',
    timestamps: true,
    paranoid: true, 
  }
);

export default DmsMaster;
