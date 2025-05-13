import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
const auth = (req: Request, res: Response, next: NextFunction) => {
  const tokenString = req.headers.authorization;
  if (!tokenString) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const token = tokenString?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as User;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;
