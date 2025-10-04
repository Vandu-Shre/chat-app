import express from 'express';

import { fetchMessages, sendMessage } from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/', authMiddleware, fetchMessages);

export default router;
