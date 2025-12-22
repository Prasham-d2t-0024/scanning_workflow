import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

/**
 * Attributes
 */
export interface UserTypeAttributes {
  user_type_id?: number;
  name: string;   // admin, doctor, staff, patient
  status: string; // active, inactive

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserTypeInput
  extends Optional<UserTypeAttributes, "user_type_id"> {}

export interface UserTypeOutput
  extends Required<UserTypeAttributes> {}

class UserType
  extends Model<UserTypeAttributes, UserTypeInput>
  implements UserTypeAttributes
{
  public user_type_id!: number;
  public name!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

UserType.init(
  {
    user_type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "active",
    },

    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: connection,
    tableName: "user_type",
    modelName: "UserType",
    timestamps: true,
    paranoid: true,
  }
);

export default UserType;
