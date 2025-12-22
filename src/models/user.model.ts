import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";
import UserType from "./usertype.model";

/**
 * Attributes
 */
export interface UserAttributes {
  user_id?: number;
  full_name: string;
  username: string;
  password: string;
  user_type_id: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Input
 */
export interface UserInput extends Optional<UserAttributes, "user_id"> {}

/**
 * Output
 */
export interface UserOutput extends Required<UserAttributes> {}

/**
 * Model
 */
class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes
{
  public user_id!: number;
  public full_name!: string;
  public username!: string;
  public password!: string;
  public user_type_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

/**
 * Init
 */
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    user_type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "user_type",
        key: "user_type_id",
      },
    },

    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: connection,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    paranoid: true,
  }
);

export default User;
