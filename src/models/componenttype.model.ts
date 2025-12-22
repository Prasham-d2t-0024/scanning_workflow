import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

/**
 * Attributes
 */
export interface ComponentTypeAttributes {
  component_type_id?: number;
  name: string;
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input type (for create)
 */
export interface ComponentTypeInput
  extends Optional<ComponentTypeAttributes, "component_type_id"> {}

/**
 * Output type
 */
export interface ComponentTypeOutput
  extends Required<ComponentTypeAttributes> {}

/**
 * Model class
 */
class ComponentType
  extends Model<ComponentTypeAttributes, ComponentTypeInput>
  implements ComponentTypeAttributes
{
  public component_type_id!: number;
  public name!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
ComponentType.init(
  {
    component_type_id: {
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
      // optional improvement:
      // type: DataTypes.ENUM("active", "inactive"),
      // defaultValue: "active",
    },

    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: connection,
    modelName: "ComponentType",
    tableName: "component_type",
    timestamps: true,
    paranoid: true,
  }
);

export default ComponentType;
