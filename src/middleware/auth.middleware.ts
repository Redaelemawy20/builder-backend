import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implement authentication logic
  next();
};

export default auth;
