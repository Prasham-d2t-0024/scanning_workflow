import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import DropdownOption from './dropdown-options.model';

/**
 * Attributes
 */
export interface DropdownAttributes {
  dropdown_id?: number;
  code: string;          // stable system key (e.g. case_status)
  name: string;          // display name (e.g. Case Status)
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type
 */
export interface DropdownInput
  extends Optional<DropdownAttributes, 'dropdown_id'> {}

/**
 * Model class
 */
class Dropdown
  extends Model<DropdownAttributes, DropdownInput>
  implements DropdownAttributes
{
  public dropdown_id!: number;
  public code!: string;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // associations
  public options?: DropdownOption[];
}

/**
 * Init
 */
Dropdown.init(
  {
    dropdown_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: 'Stable system identifier (used in code)',
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Human readable dropdown name',
    },

    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'dropdowns',
    modelName: 'Dropdown',
    timestamps: true,
    paranoid: true,
  },
);

export default Dropdown;
