import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { CHARACTERS } from '../data/storyData';
import { playCorrect, playWrong } from '../utils/audio';
import {
  TrendingUp, Landmark, BarChart3, PiggyBank,
  ChevronRight, Zap, AlertTriangle, CheckCircle2
} from 'lucide-react';
import './PortfolioBuilder.css';

const INSTRUMENTS = [
  {
    id: 'fd',
    name: 'Fixed Deposit',
    icon: Landmark,
    color: '#94A3B8',
    returnRate: 6,
    inflationAdjusted: 0,
    risk: 'Low',
    description: 'Safe but barely beats inflation',
  },
  {
    id: 'mf',
    name: 'Mutual Fund (SIP)',
    icon: BarChart3,
    color: '#3B82F6',
    returnRate: 12,
    inflationAdjusted: 6,
    risk: 'Medium',
    description: 'Professionally managed, good for beginners',
  },
  {
    id: 'index',
    name: 'Index Fund (Nifty 50)',
    icon: TrendingUp,
    color: '#10B981',
    returnRate: 14,
    inflationAdjusted: 8,
    risk: 'Medium',
    description: 'Bet on India\'s top 50 companies',
  },
];

const TOTAL_AMOUNT = 8000;
const YEARS = 10;
const INFLATION = 6;

function calculateGrowth(amount, rate, years) {
  return Math.round(amount * Math.pow(1 + rate / 100, years));
}

function getPortfolioScore(allocations) {
  const fdPct = allocations.fd;
  const mfPct = allocations.mf;
  const indexPct = allocations.index;

  let score = 0;

  // Reward diversification
  const instruments = [fdPct, mfPct, indexPct].filter(v => v > 0).length;
  if (instruments >= 2) score += 20;
  if (instruments === 3) score += 10;

  // Penalize too much FD
  if (fdPct > 50) score -= 20;
  else if (fdPct <= 30) score += 15;

  // Reward equity exposure
  const equityTotal = mfPct + indexPct;
  if (equityTotal >= 60) score += 25;
  else if (equityTotal >= 40) score += 15;

  // Reward SIP
  if (mfPct >= 20) score += 15;

  // Reward index funds
  if (indexPct >= 20) score += 15;

  return Math.max(0, Math.min(100, score));
}

function getGrade(score) {
  if (score >= 80) return { grade: 'A', label: 'Excellent Portfolio!', color: '#10B981' };
  if (score >= 60) return { grade: 'B', label: 'Good Start!', color: '#3B82F6' };
  if (score >= 40) return { grade: 'C', label: 'Needs Work', color: '#F59E0B' };
  return { grade: 'D', label: 'Too Conservative', color: '#EF4444' };
}

export default function PortfolioBuilder({ onComplete }) {
  const [allocations, setAllocations] = useState({ fd: 34, mf: 33, index: 33 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { addXp } = useGame();

  const remaining = 100 - allocations.fd - allocations.mf - allocations.index;

  const handleSlider = (instrument, value) => {
    const newValue = parseInt(value);
    const others = Object.keys(allocations).filter(k => k !== instrument);

    // Calculate how much room we have
    const otherTotal = others.reduce((sum, k) => sum + allocations[k], 0);
    const maxAllowed = 100 - otherTotal;
    const clampedValue = Math.min(newValue, maxAllowed);

    setAllocations(prev => ({ ...prev, [instrument]: clampedValue }));
  };

  const projections = useMemo(() => {
    return INSTRUMENTS.map(inst => {
      const allocated = (allocations[inst.id] / 100) * TOTAL_AMOUNT;
      const nominal = calculateGrowth(allocated * 12 * YEARS, inst.returnRate / 12, 12 * YEARS);
      // Simple monthly SIP future value
      const monthlyAmt = allocated;
      const monthlyRate = inst.returnRate / 12 / 100;
      const months = YEARS * 12;
      const futureValue = monthlyAmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const invested = monthlyAmt * months;
      return {
        ...inst,
        allocated,
        futureValue: Math.round(futureValue),
        invested: Math.round(invested),
        gains: Math.round(futureValue - invested),
      };
    });
  }, [allocations]);

  const totalFutureValue = projections.reduce((s, p) => s + p.futureValue, 0);
  const totalInvested = projections.reduce((s, p) => s + p.invested, 0);
  const totalGains = totalFutureValue - totalInvested;

  const score = getPortfolioScore(allocations);
  const gradeInfo = getGrade(score);

  const handleSubmit = () => {
    if (remaining !== 0) return;
    setIsSubmitted(true);
    if (score >= 60) {
      playCorrect();
    } else {
      playWrong();
    }
    addXp(50);
    setTimeout(() => setShowSimulation(true), 600);
  };

  const handleFinish = () => {
    if (isComplete) return;
    setIsComplete(true);
    onComplete?.();
  };

  const iqbal = CHARACTERS.iqbal;
  const laxmi = CHARACTERS.laxmi;

  return (
    <div className="portfolio-builder">
      {/* Header */}
      <div className="pb-header">
        <div className="pb-title-row">
          <PiggyBank size={20} className="pb-title-icon" />
          <h2 className="pb-title">Build Your Portfolio</h2>
        </div>
        <p className="pb-subtitle">
          You have <span className="pb-amount">₹{TOTAL_AMOUNT.toLocaleString('en-IN')}/month</span> in savings.
          Allocate across 3 instruments.
        </p>
      </div>

      {!isSubmitted ? (
        <>
          {/* Sliders */}
          <div className="pb-sliders">
            {INSTRUMENTS.map((inst) => {
              const Icon = inst.icon;
              const pct = allocations[inst.id];
              const monthlyAmt = Math.round((pct / 100) * TOTAL_AMOUNT);
              return (
                <motion.div
                  key={inst.id}
                  className="pb-slider-card glass"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: INSTRUMENTS.indexOf(inst) * 0.1 }}
                >
                  <div className="pb-slider-header">
                    <div className="pb-slider-icon" style={{ background: `${inst.color}20`, color: inst.color }}>
                      <Icon size={18} />
                    </div>
                    <div className="pb-slider-info">
                      <span className="pb-slider-name">{inst.name}</span>
                      <span className="pb-slider-desc">{inst.description}</span>
                    </div>
                    <div className="pb-slider-stats">
                      <span className="pb-slider-return" style={{ color: inst.color }}>~{inst.returnRate}% p.a.</span>
                      <span className="pb-slider-risk">{inst.risk} risk</span>
                    </div>
                  </div>

                  <div className="pb-slider-control">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pct}
                      onChange={(e) => handleSlider(inst.id, e.target.value)}
                      className="pb-range"
                      style={{ '--slider-color': inst.color, '--slider-pct': `${pct}%` }}
                    />
                    <div className="pb-slider-values">
                      <span className="pb-pct" style={{ color: inst.color }}>{pct}%</span>
                      <span className="pb-monthly">₹{monthlyAmt.toLocaleString('en-IN')}/mo</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Allocation bar */}
          <div className="pb-allocation-bar">
            {INSTRUMENTS.map(inst => (
              <div
                key={inst.id}
                className="pb-alloc-segment"
                style={{ width: `${allocations[inst.id]}%`, background: inst.color }}
              />
            ))}
            {remaining > 0 && (
              <div className="pb-alloc-segment pb-alloc-remaining" style={{ width: `${remaining}%` }} />
            )}
          </div>
          <div className="pb-alloc-labels">
            {INSTRUMENTS.map(inst => (
              <span key={inst.id} style={{ color: inst.color }}>{inst.name.split(' ')[0]}: {allocations[inst.id]}%</span>
            ))}
            {remaining > 0 && <span className="pb-remaining-text">{remaining}% unallocated</span>}
          </div>

          {/* Iqbal's temptation */}
          {allocations.fd > 50 && (
            <motion.div
              className="pb-iqbal-comment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="pb-comment-avatar" style={{ borderColor: iqbal.color }}>
                <img src={iqbal.avatar} alt={iqbal.name} />
              </div>
              <div className="pb-comment-bubble" style={{ borderColor: iqbal.color }}>
                <span className="pb-comment-name" style={{ color: iqbal.color }}>{iqbal.name}</span>
                <p>Yes, keep it all in FDs! I love eating those returns with inflation 😈</p>
              </div>
            </motion.div>
          )}

          {allocations.mf + allocations.index >= 60 && (
            <motion.div
              className="pb-laxmi-comment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="pb-comment-avatar" style={{ borderColor: laxmi.color }}>
                <img src={laxmi.avatar} alt={laxmi.name} />
              </div>
              <div className="pb-comment-bubble" style={{ borderColor: laxmi.color }}>
                <span className="pb-comment-name" style={{ color: laxmi.color }}>{laxmi.name}</span>
                <p>Great allocation! Equity exposure will help you beat inflation over time.</p>
              </div>
            </motion.div>
          )}

          {/* Submit */}
          <button
            className="btn btn-primary pb-submit"
            onClick={handleSubmit}
            disabled={remaining !== 0}
          >
            {remaining === 0 ? (
              <>Confirm Portfolio <ChevronRight size={16} /></>
            ) : (
              <>Allocate all 100% ({remaining}% left)</>
            )}
          </button>
        </>
      ) : (
        /* Simulation Results */
        <AnimatePresence>
          {showSimulation && (
            <motion.div
              className="pb-simulation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Grade */}
              <motion.div
                className="pb-grade-card"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <div className="pb-grade-circle" style={{ borderColor: gradeInfo.color, color: gradeInfo.color }}>
                  {gradeInfo.grade}
                </div>
                <div className="pb-grade-info">
                  <h3 style={{ color: gradeInfo.color }}>{gradeInfo.label}</h3>
                  <p>Portfolio Score: {score}/100</p>
                </div>
              </motion.div>

              {/* 10-Year projection */}
              <div className="pb-projection-card glass">
                <h3 className="pb-proj-title">
                  <Zap size={16} /> {YEARS}-Year Projection
                </h3>

                <div className="pb-proj-bars">
                  {projections.map((proj, i) => {
                    const Icon = proj.icon;
                    const maxVal = Math.max(...projections.map(p => p.futureValue), 1);
                    const barWidth = Math.max((proj.futureValue / maxVal) * 100, 4);
                    return (
                      <motion.div
                        key={proj.id}
                        className="pb-proj-row"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                      >
                        <div className="pb-proj-label">
                          <Icon size={14} style={{ color: proj.color }} />
                          <span>{proj.name.split(' ')[0]}</span>
                        </div>
                        <div className="pb-proj-bar-track">
                          <motion.div
                            className="pb-proj-bar-fill"
                            style={{ background: proj.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidth}%` }}
                            transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                          />
                        </div>
                        <span className="pb-proj-value" style={{ color: proj.color }}>
                          ₹{(proj.futureValue / 100000).toFixed(1)}L
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pb-proj-summary">
                  <div className="pb-proj-stat">
                    <span className="pb-proj-stat-label">Total Invested</span>
                    <span className="pb-proj-stat-value">₹{(totalInvested / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="pb-proj-stat">
                    <span className="pb-proj-stat-label">Projected Value</span>
                    <span className="pb-proj-stat-value neon-text">₹{(totalFutureValue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="pb-proj-stat">
                    <span className="pb-proj-stat-label">Gains</span>
                    <span className="pb-proj-stat-value" style={{ color: '#10B981' }}>+₹{(totalGains / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>

              {/* Laxmi's final word */}
              <motion.div
                className="pb-final-comment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="pb-comment-avatar" style={{ borderColor: laxmi.color }}>
                  <img src={laxmi.avatar} alt={laxmi.name} />
                </div>
                <div className="pb-comment-bubble" style={{ borderColor: laxmi.color }}>
                  <span className="pb-comment-name" style={{ color: laxmi.color }}>{laxmi.name}</span>
                  {score >= 60 ? (
                    <p>Impressive! You're thinking like a real investor. Start early, stay consistent, and let compounding do its magic!</p>
                  ) : (
                    <p>Not bad for a first try! Remember: too much in FDs means inflation wins. Try shifting more towards equity for long-term growth.</p>
                  )}
                </div>
              </motion.div>

              {/* Inflation warning */}
              {allocations.fd > 40 && (
                <motion.div
                  className="pb-inflation-warning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <AlertTriangle size={16} />
                  <span>With {allocations.fd}% in FDs at 6% return and ~6% inflation, that portion earns nearly 0% real returns.</span>
                </motion.div>
              )}

              <motion.button
                className="btn btn-primary pb-finish"
                onClick={handleFinish}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <CheckCircle2 size={16} /> Complete Module
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
