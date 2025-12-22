import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

/**
 * Attributes
 */
export interface RoleAttributes {
  role_id?: number;
  name: string;        // admin, super_admin, doctor, staff
  description?: string;
  status: string;      // active, inactive

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input
 */
export interface RoleInput
  extends Optional<RoleAttributes, "role_id"> {}

/**
 * Output
 */
export interface RoleOutput
  extends Required<RoleAttributes> {}

/**
 * Model
 */
class Role
  extends Model<RoleAttributes, RoleInput>
  implements RoleAttributes
{
  public role_id!: number;
  public name!: string;
  public description!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "active",
      // better:
      // type: DataTypes.ENUM("active", "inactive"),
    },

    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: connection,
    tableName: "roles",
    modelName: "Role",
    timestamps: true,
    paranoid: true,
  }
);

export default Role;
