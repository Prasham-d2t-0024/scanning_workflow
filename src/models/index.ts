import User from './user.model';
import Role from './role.model';
import UserType from './usertype.model';
import UserRole from './user_role.model';
import ComponentType from './componenttype.model';
import MetadataRegistry from './metadata_registry.model';

import MenuGroup from './menu_group.model';
import Menu from './menu.model';
import RoleMenu from './role_menu.model';

/**
 * =========================
 * User & Role Associations
 * =========================
 */

User.belongsTo(UserType, {
  foreignKey: 'user_type_id',
  as: 'userType',
});

UserType.hasMany(User, {
  foreignKey: 'user_type_id',
  as: 'users',
});

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'roles',
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'users',
});

/**
 * =========================
 * ComponentType & MetadataRegistry
 * =========================
 */

ComponentType.hasMany(MetadataRegistry, {
  foreignKey: 'componenttype_id',
  as: 'metadata',
});

MetadataRegistry.belongsTo(ComponentType, {
  foreignKey: 'componenttype_id',
  as: 'componentType',
});

/**
 * =========================
 * MenuGroup & Menu
 * =========================
 */

MenuGroup.hasMany(Menu, {
  foreignKey: 'menu_group_id',
  as: 'menus',
});

Menu.belongsTo(MenuGroup, {
  foreignKey: 'menu_group_id',
  as: 'menuGroup',
});

/**
 * =========================
 * Role & Menu (RBAC)
 * =========================
 */

Role.belongsToMany(Menu, {
  through: RoleMenu,
  foreignKey: 'role_id',
  otherKey: 'menu_id',
  as: 'menus',
});

Menu.belongsToMany(Role, {
  through: RoleMenu,
  foreignKey: 'menu_id',
  otherKey: 'role_id',
  as: 'roles',
});

/**
 * =========================
 * Exports
 * =========================
 */

export {
  User,
  Role,
  UserType,
  UserRole,
  ComponentType,
  MetadataRegistry,
  MenuGroup,
  Menu,
  RoleMenu,
};
