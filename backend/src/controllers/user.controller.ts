import { Response } from 'express';

import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/User';
import logger from '../utils/logger';

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-__v');
    if (!user) return res.status(404).json({ message: 'User not found' });

    logger.info(`User fetched: ${user.name}`);
    res.send(user);
  } catch (err) {
    logger.error('Failed to fetch user', err);
    res.status(500).json({ message: 'Server error' });
  }
};
