import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://admin:admin@testingground.foh9xqm.mongodb.net/?retryWrites=true&w=majority&appName=TestingGround');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
