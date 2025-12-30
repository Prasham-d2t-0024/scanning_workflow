import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import User from './user.model';

/**
 * Attributes
 */
export interface DigitizationCenterAttributes {
  center_id: number;
  user_id: number; // associated user

  name: string;
  code: string;
  address: string;
  email: string;
  manager_name: string;
  manager_contact: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Creation Input
 */
export interface DigitizationCenterInput
  extends Optional<
    DigitizationCenterAttributes,
    'center_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

/**
 * Model
 */
class DigitizationCenter
  extends Model<
    DigitizationCenterAttributes,
    DigitizationCenterInput
  >
  implements DigitizationCenterAttributes
{
  public center_id!: number;
  public user_id!: number;

  public name!: string;
  public code!: string;
  public address!: string;
  public email!: string;
  public manager_name!: string;
  public manager_contact!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Association
  public readonly user?: User;
}

/**
 * Init
 */
DigitizationCenter.init(
  {
    center_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    manager_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    manager_contact: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    tableName: 'digitization_centers',
    modelName: 'DigitizationCenter',
    timestamps: true,
    paranoid: true,
  }
);

export default DigitizationCenter;
