import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import './BudgetGame.css';

const BUDGET_CATEGORIES = [
  { id: 'rent', name: 'Rent & Utilities', emoji: '🏠', type: 'need', color: '#3B82F6' },
  { id: 'food', name: 'Food & Groceries', emoji: '🍽️', type: 'need', color: '#10B981' },
  { id: 'transport', name: 'Transport', emoji: '🚗', type: 'need', color: '#6366F1' },
  { id: 'entertainment', name: 'Entertainment & Shopping', emoji: '🎮', type: 'want', color: '#F59E0B' },
  { id: 'savings', name: 'Savings & Investments', emoji: '💰', type: 'save', color: '#00D4FF' },
  { id: 'emi', name: 'EMI / Loan', emoji: '🏦', type: 'need', color: '#EF4444' },
];

const TOTAL_SALARY = 52000;

export default function BudgetGame({ onComplete }) {
  const [allocations, setAllocations] = useState({
    rent: 15000,
    food: 6000,
    transport: 3000,
    entertainment: 10000,
    savings: 10000,
    emi: 5000,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const { addXp, earnBadge } = useGame();
  
  const totalAllocated = useMemo(() => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  }, [allocations]);
  
  const remaining = TOTAL_SALARY - totalAllocated;
  
  const categoryTotals = useMemo(() => {
    const needs = BUDGET_CATEGORIES.filter(c => c.type === 'need')
      .reduce((sum, c) => sum + (allocations[c.id] || 0), 0);
    const wants = BUDGET_CATEGORIES.filter(c => c.type === 'want')
      .reduce((sum, c) => sum + (allocations[c.id] || 0), 0);
    const saves = BUDGET_CATEGORIES.filter(c => c.type === 'save')
      .reduce((sum, c) => sum + (allocations[c.id] || 0), 0);
    
    return {
      needs,
      wants,
      saves,
      needsPercent: Math.round((needs / TOTAL_SALARY) * 100),
      wantsPercent: Math.round((wants / TOTAL_SALARY) * 100),
      savesPercent: Math.round((saves / TOTAL_SALARY) * 100),
    };
  }, [allocations]);
  
  const handleSliderChange = (id, value) => {
    if (isSubmitted) return;
    const numVal = parseInt(value);
    setAllocations(prev => ({ ...prev, [id]: numVal }));
  };
  
  const evaluateBudget = () => {
    const { needsPercent, wantsPercent, savesPercent } = categoryTotals;
    let score = 0;
    let tips = [];
    
    // Needs: should be ~50% (40-55 is acceptable)
    if (needsPercent >= 40 && needsPercent <= 55) {
      score += 35;
    } else if (needsPercent < 40) {
      tips.push('Your needs allocation seems low. Rent, food, and transport usually need about 50% of income.');
    } else {
      tips.push('Your needs are taking too much of your salary. Try to keep essentials under 55%.');
    }
    
    // Wants: should be ~30% (20-35 is acceptable)
    if (wantsPercent >= 15 && wantsPercent <= 35) {
      score += 30;
    } else if (wantsPercent > 35) {
      tips.push('Entertainment is taking too much! Keep wants under 30% for financial health.');
    } else {
      tips.push('It\'s okay to enjoy life a little! 20-30% on wants is healthy.');
    }
    
    // Savings: should be ~20% (15-30 is acceptable)
    if (savesPercent >= 15 && savesPercent <= 35) {
      score += 35;
    } else if (savesPercent < 15) {
      tips.push('Your savings are too low! Aim for at least 20% — your future self will thank you.');
    } else {
      tips.push('Great saving instinct! But make sure you\'re also living comfortably.');
    }
    
    // Remaining check
    if (Math.abs(remaining) > 2000) {
      score -= 10;
      if (remaining > 0) {
        tips.push(`You have ₹${remaining.toLocaleString('en-IN')} unallocated. Every rupee should have a job!`);
      } else {
        tips.push(`You're ₹${Math.abs(remaining).toLocaleString('en-IN')} over budget! You can't spend more than you earn.`);
      }
    }
    
    return { score: Math.max(0, Math.min(100, score)), tips };
  };
  
  const handleSubmit = () => {
    const result = evaluateBudget();
    setFeedback(result);
    setIsSubmitted(true);
    
    if (result.score >= 70) {
      addXp(150);
      earnBadge('budget-master');
    } else {
      addXp(75);
    }
    
    setTimeout(() => onComplete?.(result), 3000);
  };
  
  const getGrade = (score) => {
    if (score >= 90) return { letter: 'A+', color: '#00E676', message: 'Financial Genius! 🧠' };
    if (score >= 70) return { letter: 'A', color: '#00D4FF', message: 'Budget Pro! 💪' };
    if (score >= 50) return { letter: 'B', color: '#FFB800', message: 'Good Start! 📈' };
    return { letter: 'C', color: '#FF4757', message: 'Room to Grow! 🌱' };
  };
  
  // Donut chart SVG
  const donutSegments = useMemo(() => {
    const total = categoryTotals.needsPercent + categoryTotals.wantsPercent + categoryTotals.savesPercent;
    if (total === 0) return [];
    
    const segments = [];
    let offset = 0;
    
    const data = [
      { percent: categoryTotals.needsPercent, color: '#3B82F6', label: 'Needs' },
      { percent: categoryTotals.wantsPercent, color: '#F59E0B', label: 'Wants' },
      { percent: categoryTotals.savesPercent, color: '#00D4FF', label: 'Savings' },
    ];
    
    data.forEach(d => {
      const dashArray = `${(d.percent / 100) * 283} ${283 - (d.percent / 100) * 283}`;
      segments.push({ ...d, dashArray, offset: offset * 283 / 100 });
      offset += d.percent;
    });
    
    return segments;
  }, [categoryTotals]);
  
  return (
    <div className="budget-game">
      <div className="budget-header">
        <h2 className="budget-title">💸 Salary Allotment Quest</h2>
        <p className="budget-subtitle">
          You have <span className="budget-amount">₹{TOTAL_SALARY.toLocaleString('en-IN')}</span> in-hand. Allocate wisely!
        </p>
      </div>
      
      {/* Donut Chart */}
      <div className="budget-chart-container">
        <svg className="budget-donut" viewBox="0 0 100 100">
          <circle className="donut-bg" cx="50" cy="50" r="45" />
          {donutSegments.map((seg, i) => (
            <circle
              key={i}
              className="donut-segment"
              cx="50"
              cy="50"
              r="45"
              stroke={seg.color}
              strokeDasharray={seg.dashArray}
              strokeDashoffset={-seg.offset}
              style={{ transition: 'all 0.5s ease' }}
            />
          ))}
        </svg>
        <div className="donut-center">
          <span className={`donut-remaining ${remaining < 0 ? 'over-budget' : ''}`}>
            {remaining >= 0 ? `₹${remaining.toLocaleString('en-IN')}` : `-₹${Math.abs(remaining).toLocaleString('en-IN')}`}
          </span>
          <span className="donut-label">{remaining >= 0 ? 'remaining' : 'over budget!'}</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="budget-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#3B82F6' }} />
          <span>Needs {categoryTotals.needsPercent}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#F59E0B' }} />
          <span>Wants {categoryTotals.wantsPercent}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#00D4FF' }} />
          <span>Savings {categoryTotals.savesPercent}%</span>
        </div>
      </div>
      
      {/* 50/30/20 Target Bar */}
      <div className="target-bar-container">
        <div className="target-bar-label">🎯 Target: 50 / 30 / 20 rule</div>
        <div className="target-bar">
          <div className="target-segment target-needs" style={{ width: '50%' }}>50%</div>
          <div className="target-segment target-wants" style={{ width: '30%' }}>30%</div>
          <div className="target-segment target-saves" style={{ width: '20%' }}>20%</div>
        </div>
        <div className="target-bar-label">Your allocation:</div>
        <div className="target-bar">
          <div className="target-segment target-needs" style={{ width: `${Math.min(categoryTotals.needsPercent, 100)}%` }}>
            {categoryTotals.needsPercent}%
          </div>
          <div className="target-segment target-wants" style={{ width: `${Math.min(categoryTotals.wantsPercent, 100)}%` }}>
            {categoryTotals.wantsPercent}%
          </div>
          <div className="target-segment target-saves" style={{ width: `${Math.min(categoryTotals.savesPercent, 100)}%` }}>
            {categoryTotals.savesPercent}%
          </div>
        </div>
      </div>
      
      {/* Sliders */}
      <div className="budget-sliders">
        {BUDGET_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="slider-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="slider-header">
              <span className="slider-emoji">{cat.emoji}</span>
              <span className="slider-name">{cat.name}</span>
              <span className="slider-type-badge" data-type={cat.type}>
                {cat.type === 'need' ? 'Need' : cat.type === 'want' ? 'Want' : 'Save'}
              </span>
              <span className="slider-value" style={{ color: cat.color }}>
                ₹{(allocations[cat.id] || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="35000"
              step="500"
              value={allocations[cat.id] || 0}
              onChange={(e) => handleSliderChange(cat.id, e.target.value)}
              className="budget-slider"
              disabled={isSubmitted}
              style={{
                '--slider-color': cat.color,
                '--slider-percent': `${((allocations[cat.id] || 0) / 35000) * 100}%`,
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Submit */}
      {!isSubmitted ? (
        <motion.button
          className="btn btn-gold budget-submit"
          onClick={handleSubmit}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Lock in My Budget! 🔒
        </motion.button>
      ) : (
        feedback && (
          <motion.div
            className="budget-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="result-grade" style={{ '--grade-color': getGrade(feedback.score).color }}>
              <span className="grade-letter">{getGrade(feedback.score).letter}</span>
              <span className="grade-message">{getGrade(feedback.score).message}</span>
              <span className="grade-score">{feedback.score}/100</span>
            </div>
            
            {feedback.tips.length > 0 && (
              <div className="result-tips">
                {feedback.tips.map((tip, i) => (
                  <div key={i} className="tip-item">
                    <span className="tip-icon">💡</span>
                    <span className="tip-text">{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )
      )}
    </div>
  );
}
