import axios from 'axios';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import logger from '../utils/logger';

export const redirectToGitHub = (_req: Request, res: Response) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  logger.info('Redirecting to GitHub OAuth URL');
  res.redirect(redirectUrl);
};

export const loginWithGitHub = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    logger.warn('Missing OAuth code in callback request');
    return res.status(400).send('Missing code');
  }

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const access_token = tokenRes.data.access_token;

    // Get user profile from GitHub
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` },
    });

    const { id, login, avatar_url } = userRes.data;
    logger.debug(`GitHub user profile: ${JSON.stringify(userRes.data)}`);

    // Check if user exists in DB
    let user = await User.findOne({ providerId: id });

    if (!user) {
      user = await User.create({
        providerId: id,
        name: login,
        email: `${login}@github.fake`, // GitHub may not return email
        avatar: avatar_url,
      });
      logger.info(`Created new user: ${login}`);
    } else {
      logger.info(`User found: ${login}`);
    }

    // Issue JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    // Send JWT via cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in prod
      sameSite: 'lax',
    });

    logger.info(`JWT issued and user logged in: ${login}`);
    res.redirect('http://localhost:4200/chat'); // redirect to frontend
  } catch (err) {
    logger.error(`GitHub OAuth error: ${err}`);
    res.status(500).send('OAuth failed');
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // true in prod
    sameSite: 'lax',
  });

  logger.info('User logged out and cookie cleared');
  res.status(200).json({ message: 'Logged out successfully' });
};
