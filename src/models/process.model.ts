import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

/**
 * Attributes
 */
export interface ProcessAttributes {
  process_id: number;
  name: string;            // process name
  webhook: string;         // webhook URL
  status: "active" | "inactive";

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Creation Input
 */
export interface ProcessInput
  extends Optional<
    ProcessAttributes,
    "process_id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

/**
 * Output
 */
export interface ProcessOutput extends ProcessAttributes {}

/**
 * Model
 */
class Process
  extends Model<ProcessAttributes, ProcessInput>
  implements ProcessAttributes
{
  public process_id!: number;
  public name!: string;
  public webhook!: string;
  public status!: "active" | "inactive";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
Process.init(
  {
    process_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    webhook: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
    tableName: "processes",
    modelName: "Process",
    timestamps: true,
    paranoid: true,
  }
);

export default Process;
