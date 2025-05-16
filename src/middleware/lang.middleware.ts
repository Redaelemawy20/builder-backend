import { Request, Response, NextFunction } from 'express';

export const lang = (req: Request, res: Response, next: NextFunction) => {
  const lang = req.headers['accept-language'];
  if (lang === 'ar') {
    req.lang = 'ar';
  } else {
    req.lang = 'en';
  }
  next();
};

export default lang;
