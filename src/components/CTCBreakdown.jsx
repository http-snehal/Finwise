import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAYSLIP_LINES, CHARACTERS } from '../data/storyData';
import { useGame } from '../contexts/GameContext';
import { playCorrect } from '../utils/audio';
import {
  Banknote, Home, Sparkles, Lock, FileText, Landmark,
  Check, EyeOff, ChevronRight, Hand
} from 'lucide-react';
import './CTCBreakdown.css';

const ICON_MAP = {
  banknote: Banknote,
  home: Home,
  sparkles: Sparkles,
  lock: Lock,
  'file-text': FileText,
  landmark: Landmark,
};

export default function CTCBreakdown({ onComplete }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [revealedLines, setRevealedLines] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const { addXp } = useGame();
  
  const currentLine = PAYSLIP_LINES[currentLineIndex];
  
  const handleReveal = (lineId) => {
    // Only allow revealing the current unrevealed line
    if (revealedLines.includes(lineId) || lineId !== currentLine?.id) return;
    
    playCorrect();
    addXp(currentLine.xpReward);
    setRevealedLines(prev => [...prev, lineId]);
    setShowExplanation(true);
  };
  
  const handleNext = () => {
    if (isComplete) return;
    
    setShowExplanation(false);
    
    if (currentLineIndex < PAYSLIP_LINES.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      setTimeout(() => onComplete?.(), 800);
    }
  };
  
  const totalEarnings = PAYSLIP_LINES.filter(l => l.type === 'earning').reduce((s, l) => s + l.amount, 0);
  const totalDeductions = PAYSLIP_LINES.filter(l => l.type === 'deduction').reduce((s, l) => s + Math.abs(l.amount), 0);
  const netPay = totalEarnings - totalDeductions;
  
  const explainerId = currentLine?.character || 'laxmi';
  const explainer = CHARACTERS[explainerId];

  return (
    <div className="payslip-quest">
      {/* Header */}
      <div className="pq-header">
        <h2 className="pq-title">Payslip Detective</h2>
        <div className="pq-progress-bar">
          <div
            className="pq-progress-fill"
            style={{ width: `${(revealedLines.length / PAYSLIP_LINES.length) * 100}%` }}
          />
        </div>
        <span className="pq-progress-text">
          {revealedLines.length}/{PAYSLIP_LINES.length} items revealed
        </span>
      </div>
      
      {/* Payslip Card */}
      <div className="payslip-card">
        <div className="payslip-card-header">
          <span className="payslip-company">TechNova Solutions</span>
          <span className="payslip-period">April 2026</span>
        </div>
        
        <div className="payslip-lines">
          {PAYSLIP_LINES.map((line, i) => {
            const isRevealed = revealedLines.includes(line.id);
            const isCurrent = i === currentLineIndex && !isRevealed;
            const IconComponent = ICON_MAP[line.lucideIcon] || FileText;
            
            return (
              <motion.div
                key={line.id}
                className={`payslip-line ${isRevealed ? 'revealed' : 'blurred'} ${isCurrent ? 'current clickable' : ''} ${line.type}`}
                onClick={() => handleReveal(line.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={isCurrent ? { scale: 1.02, x: 5 } : {}}
                whileTap={isCurrent ? { scale: 0.98 } : {}}
              >
                <div className="pl-left">
                  <div className={`pl-icon-wrap ${line.type}`}>
                    {isRevealed ? (
                      <IconComponent size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                  </div>
                  <span className={`pl-label ${isRevealed ? '' : 'blur-text'}`}>
                    {isRevealed ? line.label : '██████████'}
                  </span>
                </div>
                <div className="pl-right">
                  {isRevealed ? (
                    <span className={`pl-amount ${line.type}`}>
                      {line.amount < 0 ? '-' : ''}₹{Math.abs(line.amount).toLocaleString('en-IN')}
                    </span>
                  ) : (
                    <span className="pl-amount blur-text">₹████</span>
                  )}
                  {isCurrent && !isRevealed && (
                    <motion.div 
                      className="pl-tap-hint"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Hand size={14} /> Tap to reveal
                    </motion.div>
                  )}
                  {isRevealed && (
                    <Check size={14} className="pl-check" />
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {/* Net Pay row */}
          <div className="payslip-line net-pay-line">
            <div className="pl-left">
              <div className="pl-icon-wrap net-pay">
                <Banknote size={14} />
              </div>
              <span className="pl-label net-pay-label">Net Pay (In-Hand)</span>
            </div>
            <div className="pl-right">
              <span className="pl-amount net-pay-amount">
                {isComplete ? `₹${netPay.toLocaleString('en-IN')}` : '₹?????'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Explanation Dialog Card */}
      <AnimatePresence mode="wait">
        {showExplanation && currentLine && (
          <motion.div
            className="pq-dialogue-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ '--explainer-color': explainer.color }}
          >
            <div className="pq-dialogue-avatar">
              <img src={explainer.avatar} alt={explainer.name} />
            </div>
            <div className="pq-dialogue-content">
              <div className="pq-dialogue-name">{explainer.name}</div>
              <p className="pq-dialogue-text">{currentLine.explanation}</p>
              <button className="btn btn-primary pq-dialogue-btn" onClick={handleNext}>
                {currentLineIndex < PAYSLIP_LINES.length - 1 ? 'Got it' : 'Finish'} <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
