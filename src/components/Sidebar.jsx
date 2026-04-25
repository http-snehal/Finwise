import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  Settings, 
  LogOut, 
  Zap, 
  Trophy,
  ShieldCheck,
  Home
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import './Sidebar.css';

export default function Sidebar() {
  const { user, logout, xp, playerName } = useGame();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <Home className="nav-icon" />, text: 'Home', path: '/' },
    { icon: <LayoutDashboard className="nav-icon" />, text: 'Dashboard', path: '/dashboard' },
    { icon: <Map className="nav-icon" />, text: 'Quest Map', path: '/quest' },
  ];

  return (
    <motion.aside 
      className="sidebar"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={18} fill="currentColor" />
        </div>
        <span className="logo-text">Finwise</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-text">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="user-profile-summary">
            <div className="user-avatar">
              {playerName ? playerName.charAt(0).toUpperCase() : 'P'}
            </div>
            <div className="user-details">
              <span className="user-name">{playerName || 'Player'}</span>
              <span className="user-xp">
                <Zap size={10} fill="currentColor" />
                {xp} XP
              </span>
            </div>
          </div>
        )}
        
        <button className="logout-btn-sidebar" onClick={handleLogout}>
          <LogOut className="nav-icon" />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
