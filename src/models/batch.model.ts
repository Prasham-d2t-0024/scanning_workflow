import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

/**
 * Attributes
 */
export interface BatchAttributes {
  batch_id?: number;
  name: string;
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type (for create)
 */
export interface BatchInput
  extends Optional<BatchAttributes, "batch_id"> {}

/**
 * Output type
 */
export interface BatchOutput
  extends Required<BatchAttributes> {}

/**
 * Model class
 */
class Batch
  extends Model<BatchAttributes, BatchInput>
  implements BatchAttributes
{
  public batch_id!: number;
  public name!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
Batch.init(
  {
    batch_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "active",
      // optional improvement:
      // type: DataTypes.ENUM("active", "inactive"),
    },

    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: connection,
    modelName: "Batch",
    tableName: "batch",
    timestamps: true,
    paranoid: true,
  }
);

export default Batch;
