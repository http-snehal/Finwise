import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Trophy, Lock, ArrowLeft, Zap } from 'lucide-react';
import HUD from '../components/HUD';
import SkillTree from '../components/SkillTree';
import DialogueBox from '../components/DialogueBox';
import CTCBreakdown from '../components/CTCBreakdown';
import BudgetGame from '../components/BudgetGame';
import BadgeUnlock from '../components/BadgeUnlock';
import SocraticDialogue from '../components/SocraticDialogue';
import PortfolioBuilder from '../components/PortfolioBuilder';
import {
  STAGE_1_DIALOGUE,
  MODULE_2_STAGE_1_DIALOGUE,
  MODULE_2_STAGE_2_QUEST,
  STAGES,
} from '../data/storyData';
import './Quest.css';

// Helper: get the module a global stage index belongs to
function getModuleForStage(globalIndex) {
  return STAGES[globalIndex]?.module || 1;
}

// Helper: get local index of a stage within its module
function getLocalIndex(globalIndex) {
  const mod = getModuleForStage(globalIndex);
  const moduleStages = STAGES.filter(s => s.module === mod);
  return moduleStages.findIndex(s => s.id === STAGES[globalIndex].id);
}

export default function Quest() {
  const [view, setView] = useState('skill-tree');
  const [budgetScore, setBudgetScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { addXp, earnBadge, xp, badges, playerName, completedStages, activeStageByModule, completeStage, user, syncToBackend } = useGame();
  const navigate = useNavigate();

  const handleStageSelect = useCallback((globalIndex) => {
    const stage = STAGES[globalIndex];
    const mod = stage.module || 1;
    const localIdx = getLocalIndex(globalIndex);
    const moduleActive = activeStageByModule[mod] ?? 0;

    // Allow if completed or is the current active stage in that module
    if (completedStages.includes(stage.id) || localIdx === moduleActive) {
      setView(`stage-${globalIndex + 1}`);
    }
  }, [activeStageByModule, completedStages]);

  const handleStageComplete = useCallback((globalIndex) => {
    const stage = STAGES[globalIndex];
    const stageId = stage.id;
    const mod = stage.module || 1;
    const localIdx = getLocalIndex(globalIndex);
    const moduleStagesCount = STAGES.filter(s => s.module === mod).length;

    // Award XP
    if (!completedStages.includes(stageId)) {
      addXp(stage.xpReward);
    }

    // Mark complete
    completeStage({ stageId, mod, localIdx, moduleStagesCount });

    // Badge rewards
    if (globalIndex === 1 && !completedStages.includes(stageId)) {
      earnBadge('payslip-pro');
    } else if (globalIndex === 2 && !completedStages.includes(stageId)) {
      earnBadge('first-quest');
      earnBadge('streak-starter');
      setShowConfetti(true);
    } else if (globalIndex === 5 && !completedStages.includes(stageId)) {
      earnBadge('first-investor');
      setShowConfetti(true);
    }

    // Sync to backend (use updated values locally for the sync)
    const newCompleted = [...new Set([...completedStages, stageId])];
    const currentActive = activeStageByModule[mod] ?? 0;
    const newActive = currentActive === localIdx ? Math.min(currentActive + 1, moduleStagesCount) : currentActive;
    
    syncToBackend({
      completedStages: newCompleted,
      activeStageByModule: { ...activeStageByModule, [mod]: newActive }
    });

    // Check if this was the last stage across ALL modules
    const allStageIds = STAGES.map(s => s.id);
    const allDone = allStageIds.every(id => newCompleted.includes(id));

    if (allDone) {
      setView('complete');
    } else {
      setView('skill-tree');
    }
  }, [completedStages, addXp, earnBadge, completeStage, activeStageByModule, syncToBackend]);

  const handleBudgetComplete = useCallback((result) => {
    setBudgetScore(result?.score || 0);
    handleStageComplete(2);
  }, [handleStageComplete]);

  const getStageTitle = () => {
    switch (view) {
      case 'stage-1': return 'Stage 1: The Story Begins';
      case 'stage-2': return 'Stage 2: Payslip Detective';
      case 'stage-3': return 'Stage 3: Budget Battle';
      case 'stage-4': return 'Stage 1: The Sleeping Money';
      case 'stage-5': return 'Stage 2: The Money Talk';
      case 'stage-6': return 'Stage 3: Build Your Portfolio';
      default: return null;
    }
  };

  const stageTitle = getStageTitle();

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
                background: ['#F59E0B', '#059669', '#EF4444', '#10B981', '#34D399'][i % 5],
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Back button + Stage title (when inside a stage) */}
      {stageTitle && (
        <motion.div
          className="stage-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="back-btn" onClick={() => setView('skill-tree')}>
            <ArrowLeft size={18} />
          </button>
          <span className="stage-title">{stageTitle}</span>
        </motion.div>
      )}

      {/* Content area */}
      <div className="quest-content">
        <AnimatePresence mode="wait">
          {/* Skill Tree */}
          {view === 'skill-tree' && (
            <motion.div key="skill-tree" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SkillTree
                completedStages={completedStages}
                activeStageByModule={activeStageByModule}
                onStageSelect={handleStageSelect}
              />
            </motion.div>
          )}

          {/* Stage 1: The Story Begins */}
          {view === 'stage-1' && (
            <motion.div key="stage-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox
                dialogues={STAGE_1_DIALOGUE}
                onComplete={() => handleStageComplete(0)}
              />
            </motion.div>
          )}

          {/* Stage 2: Payslip Detective */}
          {view === 'stage-2' && (
            <motion.div key="stage-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CTCBreakdown onComplete={() => handleStageComplete(1)} />
            </motion.div>
          )}

          {/* Stage 3: Budget Battle */}
          {view === 'stage-3' && (
            <motion.div key="stage-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BudgetGame onComplete={handleBudgetComplete} />
            </motion.div>
          )}

          {/* Stage 4: The Sleeping Money */}
          {view === 'stage-4' && (
            <motion.div key="stage-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogueBox
                dialogues={MODULE_2_STAGE_1_DIALOGUE}
                onComplete={() => handleStageComplete(3)}
              />
            </motion.div>
          )}

          {/* Stage 5: The Money Talk */}
          {view === 'stage-5' && (
            <motion.div key="stage-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SocraticDialogue
                questData={MODULE_2_STAGE_2_QUEST}
                onComplete={() => handleStageComplete(4)}
              />
            </motion.div>
          )}

          {/* Stage 6: Build Your Portfolio */}
          {view === 'stage-6' && (
            <motion.div key="stage-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PortfolioBuilder onComplete={() => handleStageComplete(5)} />
            </motion.div>
          )}

          {/* Complete Screen */}
          {view === 'complete' && (
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
                  <Trophy size={64} className="complete-trophy-icon" />
                </motion.div>

                <h2 className="complete-title">Journey Complete!</h2>
                <p className="complete-subtitle">
                  Great work, {playerName}! You've mastered Payslip 101 and The Investor.
                </p>

                <div className="complete-stats">
                  <div className="stat-item">
                    <Zap size={18} className="stat-icon neon-text" />
                    <span className="stat-value neon-text">{xp}</span>
                    <span className="stat-label">Total XP</span>
                  </div>
                  <div className="stat-item">
                    <Trophy size={18} className="stat-icon gold-text" />
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
                          <span className="earned-badge-name">{badge.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="complete-next">
                  <div className="complete-locked-module">
                    <Lock size={14} />
                    <span>Module 3: The Tax Shield — Coming Soon</span>
                  </div>
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
