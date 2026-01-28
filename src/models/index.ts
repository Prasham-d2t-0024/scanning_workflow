import User from './user.model';
import Role from './role.model';
import UserType from './usertype.model';
import UserRole from './user_role.model';
import ComponentType from './componenttype.model';
import MetadataRegistry from './metadata_registry.model';
import DigitizationCenter from './digitization-center.model';

import MenuGroup from './menu_group.model';
import Menu from './menu.model';
import RoleMenu from './role_menu.model';
import UserMenu from './user_menu.model';
import MetadataRegistryValue from './metadata_registry_value.model';
import Dropdown from './dropdown.model';
import DropdownOption from './dropdown-options.model';
import MetadataGroup from './metadata-group.model';

/**
 * =========================
 * User & Role Associations
 * =========================
 */

// User.belongsTo(UserType, {
//   foreignKey: 'user_type_id',
//   as: 'userType',
// });

// UserType.hasMany(User, {
//   foreignKey: 'user_type_id',
//   as: 'users',
// });

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

//This is saying that foreign key of Menu table is menu_group_id and this column is primary key of menuGroup table
Menu.belongsTo(MenuGroup, {
  foreignKey: 'menu_group_id',
  as: 'menuGroup',
});

/**
 * =========================
 * Role & Menu (RBAC)
 * =========================
 */

//A Role is connected to many Users, but not directly — the connection happens through the UserRole table, where role_id refers to Role and user_id refers to User.

//Role ──(role_id)──▶ UserRole ◀──(user_id)── User
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
DigitizationCenter.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

User.hasMany(DigitizationCenter, {
  foreignKey: 'user_id',
  as: 'digitizationCenters',
});

/**
 * =========================
 * User & Menu Associations
 * =========================
 */

  User.belongsToMany(Menu, {
    through: UserMenu,
    foreignKey: 'user_id',
    otherKey: 'menu_id',
    as: 'menus',
  });

  /**
   * Menu → Users
   */
  Menu.belongsToMany(User, {
    through: UserMenu,
    foreignKey: 'menu_id',
    otherKey: 'user_id',
    as: 'users',
  });

/**
 * =========================
 * MetadataRegistry & MetadataRegistryValue Associations
 * =========================
 */
  MetadataRegistry.hasMany(MetadataRegistryValue, {
    foreignKey: 'metadata_registry_id',
    as: 'metadataRegistry',
  });

   MetadataRegistryValue.belongsTo(MetadataRegistry, {
    foreignKey: 'metadata_registry_value_id',
    as: 'metadataRegistry',
  });

// =======================
// Dropdown & DropdownOption Associations
// =======================

  Dropdown.hasMany(DropdownOption, {
    foreignKey: 'dropdown_id',
    as: 'options',
  });

  DropdownOption.belongsTo(Dropdown, {
    foreignKey: 'dropdown_id',
    as: 'dropdown',
  });

// =============================
// Dropdown & Metadata registery
// =============================
  Dropdown.hasMany(MetadataRegistry, {
    foreignKey: 'dropdown_id',
    as: 'metadata',
  });

  // A metadata field may or may not have a dropdown
  MetadataRegistry.belongsTo(Dropdown, {
    foreignKey: 'dropdown_id',
    as: 'dropdown',
  });

  /**
 * =========================
 * MetadataGroup & MetadataRegistry
 * =========================
 */

  MetadataGroup.hasMany(MetadataRegistry, {
    foreignKey: 'metadata_group_id',
    as: 'metadata',
  });

  MetadataRegistry.belongsTo(MetadataGroup, {
    foreignKey: 'metadata_group_id',
    as: 'metadataGroup',
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
  DigitizationCenter,
  UserMenu,
  MetadataGroup
};
