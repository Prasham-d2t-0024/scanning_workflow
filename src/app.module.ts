import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { ComponentTypeController } from './controllers/componenttype.controller';
import { MetadataRegistryController } from './controllers/metadata-registry.controller';
import { MetadataRegistryValueController } from './controllers/metadataRegistryValue.controller';
import { BatchController } from './controllers/batch.controller';
import { ItemController } from './controllers/item.controller';
import { RoleController } from './controllers/role.controller';
import { UserRoleController } from './controllers/user-role.controller';
import { MenuController } from './controllers/menu.controller';
import { RoleMenuController } from './controllers/role-menu.controller';
import { UserController } from './controllers/user.controller';
import { ProcessController } from './controllers/process.controller';
import { MenuGroupController } from './controllers/menu-group.controller';

import AuthService from './services/auth.service';
import ComponentTypeService from './services/componenttype.service';
import BatchService from './services/batch.service';
import MetadataRegistryService from './services/metadata-registry.service';
import MetadataRegistryValueService from './services/metadata-registry-value.service';
import ItemService from './services/item.service';
import RoleService from './services/role.service';
import UserRoleService from './services/user-role.service';
import MenuService from './services/menu.service';
import UserService from './services/user.service';
import RoleMenuService from './services/role-menu.service';
import ProcessService from './services/process.service'; 
import MenuGroupService from './services/menu-group.service'; 

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
    MenuController,
    RoleMenuController,
    ProcessController, 
    MenuGroupController,
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
    MenuService,
    RoleMenuService,
    ProcessService,
    MenuGroupService
  ],
})
export class AppModule {}
