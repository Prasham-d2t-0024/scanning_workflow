import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/componenttype.model';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token provided' });
    const parts = auth.split(' ');
    if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });
    const scheme = parts[0];
    const token = parts[1];
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token malformatted' });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message || 'Unauthorized' });
  }
};
