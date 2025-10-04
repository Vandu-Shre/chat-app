import express from 'express';

import { loginWithGitHub, redirectToGitHub } from '../controllers/auth.controller';

const router = express.Router();

router.get('/github', redirectToGitHub);
router.get('/github/callback', loginWithGitHub);

export default router;
