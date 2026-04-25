import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVESTMENT_QUEST_DATA, CHARACTERS } from '../data/storyData';
import { useGame } from '../contexts/GameContext';
import { playCorrect, playWrong } from '../utils/audio';
import { Check, X, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import './InvestmentQuest.css';

export default function InvestmentQuest({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  
  const { addXp, loseHeart, earnBadge } = useGame();
  
  const currentQuestion = INVESTMENT_QUEST_DATA[currentIndex];
  const isLast = currentIndex === INVESTMENT_QUEST_DATA.length - 1;
  const explainerId = currentQuestion.explainer || 'laxmi';
  const explainer = CHARACTERS[explainerId];
  
  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option.id);
    
    if (option.correct) {
      playCorrect();
      addXp(currentQuestion.xpReward);
      setCorrectCount(prev => prev + 1);
    } else {
      playWrong();
      loseHeart();
    }
    
    setTimeout(() => setShowExplanation(true), 500);
  };
  
  const handleNext = () => {
    if (isLast) {
      const score = Math.round((correctCount / INVESTMENT_QUEST_DATA.length) * 100);
      if (score >= 60) {
        earnBadge('inflation-slayer');
      }
      onComplete?.({ score });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };
  
  return (
    <div className="investment-quest">
      <div className="iq-header">
        <div className="iq-title-row">
          <TrendingUp size={20} className="iq-title-icon" />
          <h2 className="iq-title">Pick Your Vehicle</h2>
        </div>
        <p className="iq-subtitle">
          Beat Inflation Iqbal by choosing the right investment.
        </p>
        
        <div className="iq-progress-bar">
          <div
            className="iq-progress-fill"
            style={{ width: `${((currentIndex + (selectedAnswer ? 1 : 0)) / INVESTMENT_QUEST_DATA.length) * 100}%` }}
          />
        </div>
        <span className="iq-progress-text">{currentIndex + 1}/{INVESTMENT_QUEST_DATA.length}</span>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="iq-question-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <div className="iq-question-badge">
            <Zap size={12} />
            <span>Round {currentIndex + 1}</span>
          </div>
          
          <h3 className="iq-question">{currentQuestion.question}</h3>
          
          <div className="iq-options">
            {currentQuestion.options.map((option, i) => {
              let optClass = 'iq-option';
              if (selectedAnswer) {
                if (option.correct) optClass += ' correct';
                else if (option.id === selectedAnswer && !option.correct) optClass += ' wrong';
              }
              
              return (
                <motion.button
                  key={option.id}
                  className={optClass}
                  onClick={() => handleAnswer(option)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  disabled={!!selectedAnswer}
                >
                  <span className="iq-opt-text">{option.text}</span>
                  {selectedAnswer && option.correct && <Check size={16} className="iq-opt-icon correct-icon" />}
                  {selectedAnswer === option.id && !option.correct && <X size={16} className="iq-opt-icon wrong-icon" />}
                </motion.button>
              );
            })}
          </div>
          
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="iq-dialogue-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ '--explainer-color': explainer.color }}
              >
                <div className="iq-dialogue-avatar">
                  {explainer.avatar ? (
                     <img src={explainer.avatar} alt={explainer.name} />
                  ) : (
                     <TrendingUp size={32} />
                  )}
                </div>
                <div className="iq-dialogue-content">
                  <div className="iq-dialogue-name" style={{ color: explainer.color }}>{explainer.name}</div>
                  <p className="iq-dialogue-text">{currentQuestion.explanation}</p>
                  <button className="btn btn-primary iq-next-btn" onClick={handleNext}>
                    {isLast ? 'Complete Quest' : 'Next'} <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      
      <div className="iq-score-tracker">
        <span className="iq-score-correct">{correctCount} correct</span>
        <span className="iq-score-divider">/</span>
        <span className="iq-score-total">{currentIndex + (selectedAnswer ? 1 : 0)} answered</span>
      </div>
    </div>
  );
}
