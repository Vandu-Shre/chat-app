import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import logger from '../utils/logger';

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      logger.warn('No token found in cookies');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { userId: decoded.userId };
    logger.info(`Authenticated request from user: ${decoded}`);
    next();
  } catch (err) {
    logger.error('Invalid or expired JWT token', err);
    return res.status(403).json({ message: 'Forbidden' });
  }
};
