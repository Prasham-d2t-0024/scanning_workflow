import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

export interface UserRoleAttributes {
  user_role_id?: number;
  user_id: number;
  role_id: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRoleInput
  extends Optional<UserRoleAttributes, "user_role_id"> {}

class UserRole
  extends Model<UserRoleAttributes, UserRoleInput>
  implements UserRoleAttributes
{
  public user_role_id!: number;
  public user_id!: number;
  public role_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserRole.init(
  {
    user_role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },

    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "roles",
        key: "role_id",
      },
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: "user_roles",
    modelName: "UserRole",
    timestamps: true,
    updatedAt: true,
    createdAt: true,
  }
);

export default UserRole;
