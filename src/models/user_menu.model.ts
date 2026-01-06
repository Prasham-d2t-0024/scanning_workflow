import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";

export interface UserMenuAttributes {
  user_menu_id?: number;
  user_id: number;
  menu_id: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMenuInput
  extends Optional<UserMenuAttributes, "user_menu_id"> {}

class UserMenu
  extends Model<UserMenuAttributes, UserMenuInput>
  implements UserMenuAttributes
{
  public user_menu_id!: number;
  public user_id!: number;
  public menu_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserMenu.init(
  {
    user_menu_id: {
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

    menu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "menus",
        key: "menu_id",
      },
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize: connection,
    tableName: "user_menu",
    modelName: "UserMenu",
    timestamps: true,
    updatedAt: true,
    createdAt: true,
  }
);

export default UserMenu;
