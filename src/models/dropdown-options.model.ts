import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbconnection';
import Dropdown from './dropdown.model';

/**
 * Attributes
 */
export interface DropdownOptionAttributes {
  dropdown_option_id?: number;
  dropdown_id: number;
  label: string;         // text shown to user
  value: string;         // stored value (stable)
  sort_order: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type
 */
export interface DropdownOptionInput
  extends Optional<DropdownOptionAttributes, 'dropdown_option_id'> {}

/**
 * Model class
 */
class DropdownOption
  extends Model<DropdownOptionAttributes, DropdownOptionInput>
  implements DropdownOptionAttributes
{
  public dropdown_option_id!: number;
  public dropdown_id!: number;
  public label!: string;
  public value!: string;
  public sort_order!: number;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // associations
  public dropdown?: Dropdown;
}

/**
 * Init
 */
DropdownOption.init(
  {
    dropdown_option_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    dropdown_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'dropdowns',
        key: 'dropdown_id',
      },
      onDelete: 'CASCADE',
    },

    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Display label for UI',
    },

    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Stored value (used in DB)',
    },

    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: 'dropdown_options',
    modelName: 'DropdownOption',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['dropdown_id', 'value'],
      },
    ],
  },
);

export default DropdownOption;
