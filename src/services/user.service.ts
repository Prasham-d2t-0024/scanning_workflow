import User from "../models/user.model";
import UserRole from "../models/user_role.model";
import { encryptPassword } from "../utils/password.util";

export const createUser = async (input: any) => {
  const hashedPassword = await encryptPassword(input.password);

  const user = await User.create({
    full_name: input.full_name,
    username: input.username,
    password: hashedPassword,
    user_type_id: input.user_type_id,
  });

  if (input.role_ids?.length) {
    await UserRole.bulkCreate(
      input.role_ids.map((role_id: number) => ({
        user_id: user.user_id,
        role_id,
      }))
    );
  }

  return user;
};

export const getAllUsers = async () => {
  return User.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const updateUser = async (userId: number, input: any) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  if (input.password) {
    input.password = await encryptPassword(input.password);
  }

  await user.update(input);
  return user;
};

export const deleteUser = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  await user.destroy();
};
