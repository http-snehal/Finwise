import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Trophy, Zap, LogOut, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { STAGES } from '../data/storyData';
import HUD from '../components/HUD';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout, badges, xp, playerName } = useGame();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          logout();
          navigate('/auth');
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, logout]);

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const completedCount = profile?.completedStages?.length || 0;
  const totalStages = STAGES.length;
  const progressPct = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="dashboard-page">
      <HUD />
      
      <div className="dashboard-container">
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="dh-title-row">
            <LayoutDashboard size={24} className="neon-text" />
            <h1>Player Dashboard</h1>
          </div>
          <button className="btn btn-ghost logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </motion.div>

        <div className="dashboard-grid">
          {/* Main Profile Card */}
          <motion.div 
            className="dashboard-card profile-card glass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="profile-avatar">
              {profile?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{profile?.username}</h2>
              <p>{profile?.email}</p>
            </div>
            <div className="profile-stats">
              <div className="p-stat">
                <Zap size={20} className="neon-text" />
                <span className="p-stat-val">{profile?.xp || xp}</span>
                <span className="p-stat-label">Total XP</span>
              </div>
              <div className="p-stat">
                <Trophy size={20} className="gold-text" />
                <span className="p-stat-val">{profile?.badges?.length || badges.length}</span>
                <span className="p-stat-label">Badges</span>
              </div>
            </div>
          </motion.div>

          {/* Progress Card */}
          <motion.div 
            className="dashboard-card progress-card glass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Quest Progress</h3>
            <div className="progress-radial-container">
              <div className="progress-radial" style={{ '--pct': `${progressPct}%` }}>
                <span className="progress-pct-text">{progressPct}%</span>
              </div>
            </div>
            <p className="progress-text">
              You have completed {completedCount} out of {totalStages} stages.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/quest')}>
              Continue Quest
            </button>
          </motion.div>

          {/* Badges Collection */}
          <motion.div 
            className="dashboard-card badges-card glass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Badges Earned</h3>
            <div className="dashboard-badges-grid">
              {badges.length > 0 ? badges.map(badge => (
                <div key={badge.id} className="dash-badge-item glass-gold">
                  <Trophy size={24} className="gold-text" />
                  <span className="dash-badge-name">{badge.name}</span>
                </div>
              )) : (
                <div className="no-badges">No badges earned yet. Start playing!</div>
              )}
            </div>
          </motion.div>

          {/* Completed Stages List */}
          <motion.div 
            className="dashboard-card stages-card glass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Completed Stages</h3>
            <div className="dash-stages-list">
              {profile?.completedStages?.length > 0 ? (
                STAGES.filter(s => profile.completedStages.includes(s.id)).map(stage => (
                  <div key={stage.id} className="dash-stage-item">
                    <CheckCircle2 size={18} className="neon-text" />
                    <div className="dash-stage-info">
                      <span className="dash-stage-title">{stage.title}</span>
                      <span className="dash-stage-mod">Module {stage.module}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-stages">No stages completed yet.</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
