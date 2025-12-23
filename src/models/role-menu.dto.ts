/**
 * DTOs used ONLY by controllers
 * Do NOT use interfaces here
 */

export class CreateRoleMenuDto {
  role_id!: number;
  menu_id!: number;
}

export class UpdateRoleMenuDto {
  role_id?: number;
  menu_id?: number;
}
