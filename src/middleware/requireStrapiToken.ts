import { Request, Response, NextFunction } from 'express';

export const requireStrapiToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: 'Strapi token required in Authorization header' });
  }
  next();
};
