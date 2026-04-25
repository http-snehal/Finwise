import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  badges: [{
    id: String,
    earnedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  completedStages: [{
    type: String
  }],
  activeStageByModule: {
    type: Map,
    of: Number,
    default: { "1": 0, "2": 0 }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
