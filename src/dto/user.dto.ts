/**
 * DTOs used ONLY by controllers (tsoa)
 * Do NOT use interfaces here
 */

export class CreateUserDto {
  full_name!: string;
  username!: string;
  password!: string;
  user_type_id!: number;
  role_ids!: number[];
}

export class UpdateUserDto {
  full_name?: string;
  username?: string;
  password?: string;
  user_type_id?: number;
  role_ids?: number[];
}
