import User from './user.model';
import Role from './role.model';
import UserType from './usertype.model';
import UserRole from './user_role.model';
import ComponentType from './componenttype.model';
import MetadataRegistry from './metadata_registry.model';

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

export {
  User,
  Role,
  UserType,
  UserRole,
  ComponentType,
  MetadataRegistry,
};
