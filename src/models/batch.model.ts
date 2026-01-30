import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

/**
 * Attributes
 */
export interface BatchAttributes {
  batch_id?: number;
  // status: string;
  bundle_name?: string;
  batch_delivery_date?: Date;
  is_commited?: boolean;
  user_id?: number;

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
  // public status!: string;
  public bundle_name!: string;
  public batch_delivery_date!: Date;
  public is_commited!: boolean;
  public user_id!: number;

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

    // status: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false,
    //   defaultValue: "active",
    //   // optional improvement:
    //   // type: DataTypes.ENUM("active", "inactive"),
    // },

     bundle_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    batch_delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    is_commited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
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
