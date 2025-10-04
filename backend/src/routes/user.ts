import express from 'express';

import { getCurrentUser } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/me', authMiddleware, getCurrentUser);

export default router;
