import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { ComponentTypeController } from './controllers/componenttype.controller';
import { MetadataRegistryController } from './controllers/metadata-registry.controller';
import { MetadataRegistryValueController } from './controllers/metadataRegistryValue.controller';
import { BatchController } from './controllers/batch.controller';
import { ItemController } from './controllers/item.controller';
import { RoleController } from './controllers/role.controller';
import { UserRoleController } from './controllers/user-role.controller';

import AuthService from './services/auth.service';
import ComponentTypeService from './services/componenttype.service';
import BatchService from './services/batch.service';
import MetadataRegistryService from './services/metadata-registry.service';
import MetadataRegistryValueService from './services/metadata-registry-value.service';
import ItemService from './services/item.service';
import RoleService from './services/role.service';
import UserRoleService from './services/user-role.service';

@Module({
  controllers: [
    AuthController,
    ComponentTypeController,
    MetadataRegistryController,
    MetadataRegistryValueController,
    BatchController,
    ItemController,
    RoleController,
    UserRoleController,
  ],
  providers: [
    AuthService,
    ComponentTypeService,
    BatchService,
    MetadataRegistryService,
    MetadataRegistryValueService,
    ItemService,
    RoleService,
    UserRoleService,
  ],
})
export class AppModule {}
