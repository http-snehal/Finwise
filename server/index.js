import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import gstRoutes from './routes/gst.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gst', gstRoutes);
app.use('/api/user', userRoutes);

// Ignore browser default requests to prevent annoying console errors
app.use((req, res, next) => {
  if (req.path === '/favicon.ico' || req.path.startsWith('/.well-known/')) {
    return res.status(204).end();
  }
  next();
});

// Friendly root route
app.get('/', (req, res) => {
  res.json({ message: "Finwise API Server is running! Please access the frontend via your Vite URL (e.g. localhost:5173)." });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finwise';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
