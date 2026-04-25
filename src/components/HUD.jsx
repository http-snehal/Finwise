import { useGame } from '../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './HUD.css';

export default function HUD() {
  const { xp, hearts, maxHearts, streak, xpPopup, clearXpPopup } = useGame();
  
  useEffect(() => {
    if (xpPopup) {
      const timer = setTimeout(clearXpPopup, 2000);
      return () => clearTimeout(timer);
    }
  }, [xpPopup, clearXpPopup]);
  
  return (
    <div className="hud">
      <div className="hud-inner">
        {/* XP Counter */}
        <div className="hud-stat hud-xp">
          <span className="hud-icon">⚡</span>
          <span className="hud-value">{xp}</span>
          <span className="hud-label">XP</span>
          
          <AnimatePresence>
            {xpPopup && (
              <motion.div
                key={xpPopup.id}
                className="xp-popup"
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: -30, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.8 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                +{xpPopup.amount} XP
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Hearts */}
        <div className="hud-stat hud-hearts">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <motion.span
              key={i}
              className={`heart ${i < hearts ? 'heart-full' : 'heart-empty'}`}
              animate={i < hearts ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {i < hearts ? '❤️' : '🖤'}
            </motion.span>
          ))}
        </div>
        
        {/* Streak */}
        <div className="hud-stat hud-streak">
          <span className="streak-flame">🔥</span>
          <span className="hud-value">{streak}</span>
          <span className="hud-label">day</span>
        </div>
      </div>
    </div>
  );
}
