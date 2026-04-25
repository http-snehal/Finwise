import { motion } from 'framer-motion';
import { STAGES } from '../data/storyData';
import {
  MessageCircleQuestion, TrendingUp, Search, PieChart,
  Lock, Check, ChevronRight, MessageSquare, BellRing,
  PiggyBank
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
};

const MODULE_INFO = {
  1: {
    title: 'Module 1: Payslip 101',
    subtitle: 'Decode your CTC, payslip, and first budget',
    accent: '#059669',
  },
  2: {
    title: 'Module 2: The Investor',
    subtitle: 'Learn how to make your money work for you',
    accent: '#3B82F6',
  },
};

// Group stages by module number
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

  return (
    <div className="skill-tree">
      {Object.entries(modules).map(([moduleNum, moduleStages], mi) => {
        const modNum = parseInt(moduleNum);
        const info = MODULE_INFO[modNum];
        const activeLocalIndex = activeStageByModule[modNum] ?? 0;
        const allCompleted = moduleStages.every(s => completedStages.includes(s.id));

        return (
          <motion.div
            key={modNum}
            className="skill-tree-module"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mi * 0.15 }}
          >
            {/* Module Header */}
            <div className="skill-tree-header" style={{ '--module-accent': info?.accent }}>
              <div className="module-header-top">
                <h2 className="skill-tree-title">{info?.title}</h2>
                {allCompleted && (
                  <span className="module-complete-badge">
                    <Check size={12} /> Complete
                  </span>
                )}
              </div>
              <p className="skill-tree-subtitle">{info?.subtitle}</p>
            </div>

            {/* Stages in this module */}
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: mi * 0.15 + localIndex * 0.08 }}
                  >
                    {/* Connector line (only between stages within same module) */}
                    {localIndex > 0 && (
                      <div className={`tree-connector ${isCompleted || isActive ? 'connector-active' : ''}`} />
                    )}

                    <button
                      className={`tree-node ${isCompleted ? 'node-completed' : ''} ${isActive ? 'node-active' : ''} ${isLocked ? 'node-locked' : ''}`}
                      onClick={() => !isLocked && onStageSelect(stage.globalIndex)}
                      disabled={isLocked}
                      style={{ '--node-color': stage.color }}
                    >
                      <div className="node-circle">
                        {isCompleted ? (
                          <Check size={20} />
                        ) : isLocked ? (
                          <Lock size={18} />
                        ) : (
                          <IconComponent size={20} />
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
                          <span className="node-xp-earned">+{stage.xpReward} XP</span>
                        ) : isActive ? (
                          <ChevronRight size={18} className="node-go-icon" />
                        ) : null}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
