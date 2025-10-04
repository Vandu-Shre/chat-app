import { Response } from 'express';

import { AuthRequest } from '../middleware/auth.middleware';
import { Message } from '../models/Message';
import logger from '../utils/logger';

// POST /api/messages
export const sendMessage = async (req: AuthRequest, res: Response) => {
  const text = req.body;
  if (!text) res.status(400).json({ message: 'Message text required' });

  try {
    const message = await Message.create({ user: req.user?.userId, text });

    logger.info(`Message sent by user ${req.user?.userId}`);
    res.status(201).json(message);
  } catch (err) {
    logger.error('Error sending message', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// GET /api/messages
export const fetchMessages = async (req: AuthRequest, res: Response) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('user', 'name avatar');

    res.send(messages);
  } catch (err) {
    logger.error('Error fetching messages', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};
