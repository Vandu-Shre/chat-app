import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';
import userRoutes from './routes/user';
import logger from './utils/logger';

dotenv.config();

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (_req, res) => {
  res.send('Hello Chat App 🚀');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
