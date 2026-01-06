import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model, Optional } from "sequelize";
import connection from "../config/dbconnection";
import UserType from "./usertype.model";
import Role from "./role.model";
import Menu from "./menu.model";

/**
 * Attributes
 */
export interface UserAttributes {
  user_id?: number;
  full_name: string;
  username: string;
  password: string;

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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public addRole!: BelongsToManyAddAssociationMixin<Role, number>;
  public addRoles!: BelongsToManyAddAssociationsMixin<Role, number>;
  public setRoles!: BelongsToManySetAssociationsMixin<Role, number>;
  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
  public addMenu!: BelongsToManyAddAssociationMixin<Menu, number>;
  public addMenus!: BelongsToManyAddAssociationsMixin<Menu, number>;
  public setMenus!: BelongsToManySetAssociationsMixin<Menu, number>;
  public getMenus!: BelongsToManyGetAssociationsMixin<Menu>;
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
