import dbConnect from '../_lib/dbConnect.js';
import User from '../_lib/User.js';
import { protect } from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await dbConnect();

  const user = protect(req);
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { action } = req.query;

  // GET /api/user?action=profile
  if (req.method === 'GET' && action === 'profile') {
    try {
      const userData = await User.findById(user.id).select('-password');
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(userData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // PUT /api/user?action=progress
  if (req.method === 'PUT' && action === 'progress') {
    try {
      const { xp, badges, completedStages, activeStageByModule, hearts, completedQuests } = req.body;
      
      const userData = await User.findById(user.id);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (xp !== undefined) userData.xp = xp;
      if (badges) userData.badges = badges;
      if (completedStages) userData.completedStages = completedStages;
      if (activeStageByModule) userData.activeStageByModule = activeStageByModule;
      if (hearts !== undefined) userData.hearts = hearts;
      if (completedQuests) userData.completedQuests = completedQuests;

      await userData.save();
      
      return res.json({
        xp: userData.xp,
        badges: userData.badges,
        completedStages: userData.completedStages,
        activeStageByModule: userData.activeStageByModule,
        hearts: userData.hearts,
        completedQuests: userData.completedQuests
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(404).json({ message: 'Not found. Use ?action=profile or ?action=progress' });
}
