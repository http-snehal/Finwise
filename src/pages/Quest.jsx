import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import HUD from '../components/HUD';
import DialogueBox from '../components/DialogueBox';
import CTCBreakdown from '../components/CTCBreakdown';
import BudgetGame from '../components/BudgetGame';
import BadgeUnlock from '../components/BadgeUnlock';
import {
  SCENE_INTERVIEW,
  SCENE_PAYSLIP,
  SCENE_CTC_INTRO,
  SCENE_CTC_OUTRO,
  SCENE_BUDGET_INTRO,
  SCENE_BUDGET_OUTRO_GOOD,
  SCENE_BUDGET_OUTRO_BAD,
  SCENE_FINALE,
} from '../data/storyData';
import './Quest.css';

const PHASES = [
  'interview',       // 0 - Interview room scene
  'payslip',         // 1 - Payslip reveal scene
  'ctc-intro',       // 2 - CTC intro dialogue
  'ctc-breakdown',   // 3 - Interactive CTC breakdown
  'ctc-outro',       // 4 - CTC outro dialogue
  'budget-intro',    // 5 - Budget intro dialogue
  'budget-game',     // 6 - Budget mini-game
  'budget-outro',    // 7 - Budget outro dialogue
  'finale',          // 8 - Finale scene
  'complete',        // 9 - Quest complete screen
];

export default function Quest() {
  const [phase, setPhase] = useState(0);
  const [budgetScore, setBudgetScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { addXp, earnBadge, xp, badges, playerName } = useGame();
  const navigate = useNavigate();
  
  const currentPhase = PHASES[phase];
  
  const advancePhase = useCallback(() => {
    setPhase(prev => {
      const next = prev + 1;
      
      // XP rewards at phase transitions
      if (prev === 0) addXp(30); // Completed interview scene
      if (prev === 1) addXp(50); // Completed payslip reveal
      if (prev === 3) {
        addXp(100); // Completed CTC breakdown
        earnBadge('first-quest');
      }
      if (prev === 7) {
        earnBadge('payslip-pro');
        earnBadge('streak-starter');
        setShowConfetti(true);
      }
      
      return next;
    });
  }, [addXp, earnBadge]);
  
  const handleBudgetComplete = useCallback((result) => {
    setBudgetScore(result?.score || 0);
    setPhase(7); // Go to budget outro
  }, []);
  
  const getPhaseTitle = () => {
    switch (currentPhase) {
      case 'interview': return 'Chapter 1: The Interview Room';
      case 'payslip': return 'Chapter 2: The Rude Awakening';
      case 'ctc-intro':
      case 'ctc-breakdown':
      case 'ctc-outro': return 'Chapter 3: Decoding Your CTC';
      case 'budget-intro':
      case 'budget-game':
      case 'budget-outro': return 'Chapter 4: The Budget Quest';
      case 'finale': return '🏆 Quest Complete!';
      default: return 'WealthQuest';
    }
  };
  
  return (
    <div className="quest-page">
      <HUD />
      <BadgeUnlock />
      
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
                background: ['#FFB800', '#00D4FF', '#FF4757', '#00E676', '#3B82F6'][i % 5],
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Phase title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          className="phase-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <span className="phase-title">{getPhaseTitle()}</span>
        </motion.div>
      </AnimatePresence>
      
      {/* Content area */}
      <div className="quest-content">
        <AnimatePresence mode="wait">
          {/* Interview Scene */}
          {currentPhase === 'interview' && (
            <motion.div key="interview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox dialogues={SCENE_INTERVIEW} onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* Payslip Reveal */}
          {currentPhase === 'payslip' && (
            <motion.div key="payslip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox dialogues={SCENE_PAYSLIP} onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* CTC Intro */}
          {currentPhase === 'ctc-intro' && (
            <motion.div key="ctc-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox dialogues={SCENE_CTC_INTRO} onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* CTC Breakdown Interactive */}
          {currentPhase === 'ctc-breakdown' && (
            <motion.div key="ctc-breakdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CTCBreakdown onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* CTC Outro */}
          {currentPhase === 'ctc-outro' && (
            <motion.div key="ctc-outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox dialogues={SCENE_CTC_OUTRO} onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* Budget Intro */}
          {currentPhase === 'budget-intro' && (
            <motion.div key="budget-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox dialogues={SCENE_BUDGET_INTRO} onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* Budget Game */}
          {currentPhase === 'budget-game' && (
            <motion.div key="budget-game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BudgetGame onComplete={handleBudgetComplete} />
            </motion.div>
          )}
          
          {/* Budget Outro */}
          {currentPhase === 'budget-outro' && (
            <motion.div key="budget-outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox
                dialogues={budgetScore >= 70 ? SCENE_BUDGET_OUTRO_GOOD : SCENE_BUDGET_OUTRO_BAD}
                onComplete={advancePhase}
              />
            </motion.div>
          )}
          
          {/* Finale */}
          {currentPhase === 'finale' && (
            <motion.div key="finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox dialogues={SCENE_FINALE} onComplete={advancePhase} />
            </motion.div>
          )}
          
          {/* Complete Screen */}
          {currentPhase === 'complete' && (
            <motion.div
              key="complete"
              className="quest-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="complete-card glass">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="complete-trophy"
                >
                  🏆
                </motion.div>
                
                <h2 className="complete-title">Quest Complete!</h2>
                <p className="complete-subtitle">
                  Amazing work, {playerName}! You've conquered Module 1.
                </p>
                
                <div className="complete-stats">
                  <div className="stat-item">
                    <span className="stat-value neon-text">{xp}</span>
                    <span className="stat-label">Total XP</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value gold-text">{badges.length}</span>
                    <span className="stat-label">Badges</span>
                  </div>
                </div>
                
                {badges.length > 0 && (
                  <div className="complete-badges">
                    <h3 className="complete-badges-title">Badges Earned</h3>
                    <div className="badges-row">
                      {badges.map((badge, i) => (
                        <motion.div
                          key={badge.id}
                          className="earned-badge"
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                        >
                          <span className="earned-badge-emoji">{badge.emoji}</span>
                          <span className="earned-badge-name">{badge.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="complete-next">
                  <p className="complete-next-text">
                    🔒 Module 2: The Tax Shield — Coming Soon!
                  </p>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Back to Home
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
