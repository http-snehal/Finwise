import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { LEARNING_CARDS_DATA } from '../data/storyData';
import { 
  TrendingUp, Scale, ShieldCheck, Users, 
  CalendarClock, BarChart, Layers, 
  ChevronRight, ChevronLeft, Sparkles 
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
};

export default function LearningCards({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addXp } = useGame();
  
  const currentCard = LEARNING_CARDS_DATA[currentIndex];
  const IconComponent = ICON_MAP[currentCard.icon] || TrendingUp;
  const isLast = currentIndex === LEARNING_CARDS_DATA.length - 1;

  const handleNext = () => {
    addXp(currentCard.xpReward);
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
        <h2 className="lc-title">Investment 101</h2>
        <div className="lc-progress-bar">
          <div
            className="lc-progress-fill"
            style={{ width: `${((currentIndex + 1) / LEARNING_CARDS_DATA.length) * 100}%` }}
          />
        </div>
        <span className="lc-progress-text">{currentIndex + 1}/{LEARNING_CARDS_DATA.length}</span>
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
            <div className="lc-icon-wrapper">
              <IconComponent size={48} className="lc-icon" />
              <Sparkles className="lc-icon-sparkle" size={20} />
            </div>
            
            <h3 className="lc-card-title">{currentCard.title}</h3>
            <p className="lc-card-text">{currentCard.text}</p>
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
