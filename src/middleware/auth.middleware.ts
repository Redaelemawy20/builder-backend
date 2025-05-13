import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.user = decoded as User;
  next();
};

export default auth;
