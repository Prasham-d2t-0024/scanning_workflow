import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const encryptPassword = async (
  plainPassword: string
): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
