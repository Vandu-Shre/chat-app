import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import { connectDB } from './config/db';
import { User } from './models/User';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello Chat App 🚀');
});

app.get('/create-user', async (req, res) => {
  const testUser = await User.create({
    providerId: 'github123',
    name: 'Vandu',
    email: 'vandu@example.com',
    avatar: 'https://example.com/avatar.png',
  });
  res.json(testUser);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
