import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { ComponentTypeController } from './controllers/componenttype.controller';
import { MetadataRegistryController } from './controllers/metadata-registry.controller';
import { MetadataRegistryValueController } from './controllers/metadataRegistryValue.controller';
import { BatchController } from './controllers/batch.controller';
import { ItemController } from './controllers/item.controller';
import { RoleController } from './controllers/role.controller';
import { UserRoleController } from './controllers/user-role.controller';
import { MenuController } from './controllers/menu.controller'; // ✅ added

import AuthService from './services/auth.service';
import ComponentTypeService from './services/componenttype.service';
import BatchService from './services/batch.service';
import MetadataRegistryService from './services/metadata-registry.service';
import MetadataRegistryValueService from './services/metadata-registry-value.service';
import ItemService from './services/item.service';
import RoleService from './services/role.service';
import UserRoleService from './services/user-role.service';
import MenuService from './services/menu.service'; // ✅ added
import UserService from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [
    AuthController,
    UserController,
    ComponentTypeController,
    MetadataRegistryController,
    MetadataRegistryValueController,
    BatchController,
    ItemController,
    RoleController,
    UserRoleController,
    MenuController, // ✅ added
  ],
  providers: [
    AuthService,
    UserService,
    ComponentTypeService,
    BatchService,
    MetadataRegistryService,
    MetadataRegistryValueService,
    ItemService,
    RoleService,
    UserRoleService,
    MenuService, // ✅ added
  ],
})
export class AppModule {}
