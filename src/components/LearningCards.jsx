import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { 
  TrendingUp, Scale, ShieldCheck, Users, 
  CalendarClock, BarChart, Layers, 
  ChevronRight, ChevronLeft, Sparkles,
  SplitSquareHorizontal, Globe, PiggyBank,
  FileText
} from 'lucide-react';
import './LearningCards.css';

const ICON_MAP = {
  'trending-up': TrendingUp,
  scale: Scale,
  'shield-check': ShieldCheck,
  users: Users,
  'calendar-clock': CalendarClock,
  'bar-chart': BarChart,
  layers: Layers,
  'split-square-horizontal': SplitSquareHorizontal,
  globe: Globe,
  'piggy-bank': PiggyBank,
  'file-text': FileText,
};

export default function LearningCards({ cards = [], onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addXp } = useGame();
  
  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];
  const IconComponent = ICON_MAP[currentCard.icon] || TrendingUp;
  const isLast = currentIndex === cards.length - 1;

  const handleNext = () => {
    if (currentCard.xpReward) {
      addXp(currentCard.xpReward);
    }
    if (isLast) {
      onComplete?.();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="learning-cards-container">
      <div className="lc-header">
        <h2 className="lc-title">Key Concepts</h2>
        <div className="lc-progress-bar">
          <div
            className="lc-progress-fill"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
        <span className="lc-progress-text">{currentIndex + 1}/{cards.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="lc-card glass"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="lc-card-inner">
            <div className="lc-icon-wrapper" style={{ background: currentCard.color ? `${currentCard.color}20` : undefined }}>
              <IconComponent size={48} className="lc-icon" style={{ color: currentCard.color }} />
              <Sparkles className="lc-icon-sparkle" size={20} style={{ color: currentCard.color }} />
            </div>
            
            <h3 className="lc-card-title">{currentCard.title}</h3>
            <p className="lc-card-text">{currentCard.text || currentCard.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="lc-controls">
        <button 
          className="btn btn-secondary lc-prev-btn" 
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={20} />
        </button>
        <button className="btn btn-primary lc-next-btn" onClick={handleNext}>
          {isLast ? 'Complete Module' : 'Got it'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
