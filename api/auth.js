import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../_lib/dbConnect.js';
import User from '../_lib/User.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await dbConnect();

  const { action } = req.query;

  // POST /api/auth?action=register
  if (req.method === 'POST' && action === 'register') {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      return res.status(201).json({
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          xp: newUser.xp,
          badges: newUser.badges,
          completedStages: newUser.completedStages,
          activeStageByModule: newUser.activeStageByModule,
        }
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // POST /api/auth?action=login
  if (req.method === 'POST' && action === 'login') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          xp: user.xp,
          badges: user.badges,
          completedStages: user.completedStages,
          activeStageByModule: user.activeStageByModule,
        }
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(404).json({ message: 'Not found. Use ?action=register or ?action=login' });
}
