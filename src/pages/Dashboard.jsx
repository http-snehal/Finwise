import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { 
  Trophy, Zap, CheckCircle2, LayoutDashboard, 
  Pencil, X, Save, Target, Flame, Award, 
  BookOpen, ArrowRight, Shield
} from 'lucide-react';
import { STAGES } from '../data/storyData';
import HUD from '../components/HUD';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout, badges, xp, playerName, completedStages, setPlayerName } = useGame();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState(playerName || '');

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  if (!user) return null;

  const completedCount = completedStages?.length || 0;
  const totalStages = STAGES.length;
  const progressPct = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;
  const userXp = xp || 0;
  const userBadges = badges || [];
  const level = Math.floor(userXp / 100) + 1;
  const xpToNext = 100 - (userXp % 100);

  // Module progress
  const modules = [
    { id: 1, name: 'Payslip 101', icon: <BookOpen size={16} />, color: '#10B981', stages: STAGES.filter(s => s.module === 1) },
    { id: 2, name: 'The Investor', icon: <Target size={16} />, color: '#3B82F6', stages: STAGES.filter(s => s.module === 2) },
    { id: 3, name: 'Tax Shield', icon: <Shield size={16} />, color: '#8B5CF6', stages: STAGES.filter(s => s.module === 3) },
  ];

  const handleSaveProfile = async () => {
    if (!editUsername.trim()) return;
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ username: editUsername })
      });
      if (res.ok) {
        setPlayerName(editUsername);
        setEditMode(false);
      }
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    })
  };

  return (
    <div className="dashboard-page has-sidebar">
      <Sidebar />
      <HUD />

      <div className="dashboard-container">
        {/* Welcome Banner */}
        <motion.div 
          className="welcome-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="wb-left">
            <span className="wb-greeting">Welcome back,</span>
            <div className="wb-name-row">
              {editMode ? (
                <div className="wb-edit-row">
                  <input 
                    className="wb-edit-input" 
                    value={editUsername} 
                    onChange={(e) => setEditUsername(e.target.value)}
                    autoFocus
                  />
                  <button className="wb-edit-btn save" onClick={handleSaveProfile}>
                    <Save size={14} />
                  </button>
                  <button className="wb-edit-btn cancel" onClick={() => { setEditMode(false); setEditUsername(playerName || ''); }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="wb-name">{playerName}</h1>
                  <button className="wb-edit-trigger" onClick={() => setEditMode(true)}>
                    <Pencil size={13} />
                  </button>
                </>
              )}
            </div>
            <p className="wb-email">{user?.email}</p>
          </div>
          <div className="wb-right">
            <div className="wb-level-badge">
              <Flame size={18} />
              <span className="wb-level-num">Lvl {level}</span>
            </div>
            <div className="wb-xp-bar-wrapper">
              <div className="wb-xp-bar">
                <motion.div 
                  className="wb-xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - (xpToNext)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <span className="wb-xp-text">{xpToNext} XP to Level {level + 1}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="stats-row">
          {[
            { icon: <Zap size={20} />, value: userXp, label: 'Total XP', color: 'var(--neon-primary)', bg: 'rgba(16, 185, 129, 0.08)' },
            { icon: <Trophy size={20} />, value: userBadges.length, label: 'Badges', color: 'var(--gold-primary)', bg: 'rgba(245, 158, 11, 0.08)' },
            { icon: <CheckCircle2 size={20} />, value: `${completedCount}/${totalStages}`, label: 'Stages Done', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)' },
            { icon: <Flame size={20} />, value: `${progressPct}%`, label: 'Progress', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.08)' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="stat-card glass"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="stat-icon-wrap" style={{ color: stat.color, background: stat.bg }}>
                {stat.icon}
              </div>
              <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Module Progress */}
          <motion.div 
            className="dashboard-card module-progress-card glass"
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="card-header">
              <LayoutDashboard size={18} className="neon-text" />
              <h3>Module Progress</h3>
            </div>
            <div className="modules-list">
              {modules.map((mod) => {
                const completed = mod.stages.filter(s => completedStages?.includes(s.id)).length;
                const total = mod.stages.length;
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                return (
                  <div key={mod.id} className="module-row">
                    <div className="module-icon" style={{ color: mod.color, background: `${mod.color}15` }}>
                      {mod.icon}
                    </div>
                    <div className="module-details">
                      <div className="module-name-row">
                        <span className="module-name">{mod.name}</span>
                        <span className="module-pct" style={{ color: mod.color }}>{pct}%</span>
                      </div>
                      <div className="module-bar">
                        <motion.div 
                          className="module-bar-fill" 
                          style={{ background: mod.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="module-sub">{completed} of {total} stages</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-primary module-cta" onClick={() => navigate('/quest')}>
              Continue Quest <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Badges Collection */}
          <motion.div 
            className="dashboard-card badges-card glass"
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="card-header">
              <Award size={18} className="gold-text" />
              <h3>Badges Earned</h3>
            </div>
            <div className="dashboard-badges-grid">
              {userBadges.length > 0 ? userBadges.map((badge, i) => (
                <motion.div 
                  key={badge.id}
                  className="dash-badge-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                >
                  <div className="badge-icon-wrap">
                    <Trophy size={22} className="gold-text" />
                  </div>
                  <span className="dash-badge-name">{badge.name}</span>
                </motion.div>
              )) : (
                <div className="no-badges">
                  <Trophy size={32} style={{ opacity: 0.15 }} />
                  <span>Complete quests to earn badges!</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Completed Stages */}
          <motion.div 
            className="dashboard-card stages-card glass"
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="card-header">
              <CheckCircle2 size={18} className="neon-text" />
              <h3>Completed Stages</h3>
            </div>
            <div className="dash-stages-list">
              {profile?.completedStages?.length > 0 ? (
                STAGES.filter(s => profile.completedStages.includes(s.id)).map((stage, i) => (
                  <motion.div 
                    key={stage.id} 
                    className="dash-stage-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                  >
                    <div className="stage-check">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="dash-stage-info">
                      <span className="dash-stage-title">{stage.title}</span>
                      <span className="dash-stage-mod">Module {stage.module} · +{stage.xpReward} XP</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-stages">
                  <BookOpen size={32} style={{ opacity: 0.15 }} />
                  <span>Start your first quest to see progress here!</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
