import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

// default: 1 day in seconds
const JWT_EXPIRES_IN_SECONDS: number =
  Number(process.env.JWT_EXPIRES_IN) || 60 * 60 * 24;

export interface JwtPayload {
  user_id: number;
  username: string;
  roles: string[];
}

export const signToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN_SECONDS, // ✅ number
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
