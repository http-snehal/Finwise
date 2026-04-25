import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user profile/progress
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update progress
router.put('/progress', protect, async (req, res) => {
  try {
    const { xp, badges, completedStages, activeStageByModule } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (xp !== undefined) user.xp = xp;
    if (badges) user.badges = badges;
    if (completedStages) user.completedStages = completedStages;
    if (activeStageByModule) user.activeStageByModule = activeStageByModule;

    await user.save();
    
    res.json({
      xp: user.xp,
      badges: user.badges,
      completedStages: user.completedStages,
      activeStageByModule: user.activeStageByModule
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
