import express from 'express';

import { loginWithGitHub, logout, redirectToGitHub } from '../controllers/auth.controller';

const router = express.Router();

router.get('/github', redirectToGitHub);
router.get('/github/callback', loginWithGitHub);
router.post('/logout', logout);

export default router;
