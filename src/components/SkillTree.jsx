import { motion } from 'framer-motion';
import { STAGES } from '../data/storyData';
import { useGame } from '../contexts/GameContext';
import {
  MessageCircleQuestion, TrendingUp, Search, PieChart,
  Lock, Check, ChevronRight, MessageSquare, BellRing,
  PiggyBank, BookOpen, Zap, Shield, Star, Flame, Heart
} from 'lucide-react';
import './SkillTree.css';

const ICON_MAP = {
  'message-square': MessageSquare,
  'bell-ring': BellRing,
  search: Search,
  'pie-chart': PieChart,
  'message-circle-question': MessageCircleQuestion,
  'trending-up': TrendingUp,
  'piggy-bank': PiggyBank,
  'book-open': BookOpen,
};

const MODULE_INFO = {
  1: {
    title: 'Payslip 101',
    subtitle: 'Decode your CTC, payslip, and first budget',
    accent: '#059669',
    icon: <BookOpen size={18} />,
    gradient: 'linear-gradient(135deg, #059669, #10B981)',
  },
  2: {
    title: 'The Investor',
    subtitle: 'Learn how to make your money work for you',
    accent: '#3B82F6',
    icon: <TrendingUp size={18} />,
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
  },
  3: {
    title: 'The Tax Shield',
    subtitle: 'Master GST, CGST/SGST, and Input Tax Credit',
    accent: '#8B5CF6',
    icon: <Shield size={18} />,
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
  },
};

function groupByModule(stages) {
  const modules = {};
  stages.forEach((stage, globalIndex) => {
    const mod = stage.module || 1;
    if (!modules[mod]) modules[mod] = [];
    modules[mod].push({ ...stage, globalIndex });
  });
  return modules;
}

export default function SkillTree({ completedStages, activeStageByModule, onStageSelect }) {
  const modules = groupByModule(STAGES);
  const { xp, hearts, maxHearts, streak } = useGame();

  const totalCompleted = completedStages.length;
  const totalStages = STAGES.length;
  const overallPct = Math.round((totalCompleted / totalStages) * 100);

  return (
    <div className="skill-tree">
      {/* Player Stats Banner */}
      <motion.div 
        className="st-stats-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="st-stat-item">
          <div className="st-stat-icon xp-icon">
            <Zap size={16} fill="currentColor" />
          </div>
          <div className="st-stat-text">
            <span className="st-stat-value">{xp}</span>
            <span className="st-stat-label">XP</span>
          </div>
        </div>

        <div className="st-stat-item">
          <div className="st-stat-icon hearts-icon">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <Heart key={i} size={14} fill={i < hearts ? '#FF4757' : 'none'} stroke={i < hearts ? '#FF4757' : '#ccc'} />
            ))}
          </div>
        </div>

        <div className="st-stat-item">
          <div className="st-stat-icon streak-icon">
            <Flame size={16} fill="currentColor" />
          </div>
          <div className="st-stat-text">
            <span className="st-stat-value">{streak}</span>
            <span className="st-stat-label">Day</span>
          </div>
        </div>
      </motion.div>

      {/* Overall Progress */}
      <motion.div 
        className="st-overall-progress"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="st-progress-info">
          <Star size={16} className="st-progress-star" />
          <span className="st-progress-text">Quest Progress</span>
          <span className="st-progress-count">{totalCompleted}/{totalStages}</span>
        </div>
        <div className="st-progress-bar">
          <motion.div 
            className="st-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Module Cards */}
      {Object.entries(modules).map(([moduleNum, moduleStages], mi) => {
        const modNum = parseInt(moduleNum);
        const info = MODULE_INFO[modNum];
        const activeLocalIndex = activeStageByModule[modNum] ?? 0;
        const completedInModule = moduleStages.filter(s => completedStages.includes(s.id)).length;
        const allCompleted = completedInModule === moduleStages.length;
        const modulePct = Math.round((completedInModule / moduleStages.length) * 100);

        return (
          <motion.div
            key={modNum}
            className="skill-tree-module"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + mi * 0.12 }}
            style={{ '--module-accent': info?.accent }}
          >
            {/* Module Header */}
            <div className="skill-tree-header">
              <div className="module-badge" style={{ background: info?.gradient }}>
                {info?.icon}
              </div>
              <div className="module-header-text">
                <div className="module-header-top">
                  <span className="module-num-label">Module {modNum}</span>
                  {allCompleted && (
                    <span className="module-complete-badge">
                      <Check size={10} /> Mastered
                    </span>
                  )}
                </div>
                <h2 className="skill-tree-title">{info?.title}</h2>
                <p className="skill-tree-subtitle">{info?.subtitle}</p>
              </div>
              <div className="module-progress-mini">
                <span className="module-pct" style={{ color: info?.accent }}>{modulePct}%</span>
              </div>
            </div>

            {/* Module Progress Bar */}
            <div className="module-progress-bar-wrap">
              <motion.div 
                className="module-progress-bar-fill"
                style={{ background: info?.gradient }}
                initial={{ width: 0 }}
                animate={{ width: `${modulePct}%` }}
                transition={{ duration: 0.8, delay: 0.3 + mi * 0.1 }}
              />
            </div>

            {/* Stages */}
            <div className="skill-tree-track">
              {moduleStages.map((stage, localIndex) => {
                const isCompleted = completedStages.includes(stage.id);
                const isActive = localIndex === activeLocalIndex && !isCompleted;
                const isLocked = !isCompleted && localIndex > activeLocalIndex;
                const IconComponent = ICON_MAP[stage.lucideIcon] || Search;

                return (
                  <motion.div
                    key={stage.id}
                    className="skill-tree-node-wrapper"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + mi * 0.12 + localIndex * 0.06 }}
                  >
                    {localIndex > 0 && (
                      <div className={`tree-connector ${isCompleted || isActive ? 'connector-active' : ''}`} />
                    )}

                    <button
                      className={`tree-node ${isCompleted ? 'node-completed' : ''} ${isActive ? 'node-active' : ''} ${isLocked ? 'node-locked' : ''}`}
                      onClick={() => !isLocked && onStageSelect(stage.globalIndex)}
                      disabled={isLocked}
                      style={{ '--node-color': stage.color || info?.accent }}
                    >
                      <div className="node-circle">
                        {isCompleted ? (
                          <Check size={18} />
                        ) : isLocked ? (
                          <Lock size={16} />
                        ) : (
                          <IconComponent size={18} />
                        )}
                      </div>

                      <div className="node-info">
                        <div className="node-info-top">
                          <span className="node-number">Stage {stage.number}</span>
                          <span className={`node-type-badge ${stage.type}`}>{stage.type}</span>
                        </div>
                        <h3 className="node-title">{stage.title}</h3>
                        <p className="node-subtitle">{stage.subtitle}</p>
                      </div>

                      <div className="node-right">
                        {isCompleted ? (
                          <div className="node-xp-pill">
                            <Zap size={10} /> +{stage.xpReward}
                          </div>
                        ) : isActive ? (
                          <div className="node-play-btn">
                            <ChevronRight size={18} />
                          </div>
                        ) : (
                          <span className="node-xp-preview">+{stage.xpReward} XP</span>
                        )}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* Coming Soon Module */}
      <motion.div 
        className="skill-tree-module coming-soon-module"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="skill-tree-header">
          <div className="module-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
            <Lock size={18} />
          </div>
          <div className="module-header-text">
            <h2 className="skill-tree-title" style={{ color: 'var(--text-muted)' }}>More modules coming soon</h2>
            <p className="skill-tree-subtitle">Investor II, Budgeting, Money Management</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
