import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUDGET_QUIZ } from '../data/storyData';
import { useGame } from '../contexts/GameContext';
import { playCorrect, playWrong } from '../utils/audio';
import { Check, X, Lightbulb, ChevronRight, Zap, PieChart } from 'lucide-react';
import './BudgetGame.css';

export default function BudgetGame({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  
  const { addXp, loseHeart, earnBadge } = useGame();
  
  const currentQuestion = BUDGET_QUIZ[currentIndex];
  const isLast = currentIndex === BUDGET_QUIZ.length - 1;
  
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
  
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (isComplete) return;

    if (isLast) {
      setIsComplete(true);
      // Evaluate and complete
      const score = Math.round((correctCount / BUDGET_QUIZ.length) * 100);
      if (score >= 60) {
        earnBadge('budget-master');
      }
      onComplete?.({ score });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };
  
  return (
    <div className="budget-quiz">
      {/* Header */}
      <div className="bq-header">
        <div className="bq-title-row">
          <PieChart size={20} className="bq-title-icon" />
          <h2 className="bq-title">Budget Battle</h2>
        </div>
        <p className="bq-subtitle">
          You have ₹52,000. Master the 50/30/20 rule.
        </p>
        
        {/* Progress */}
        <div className="bq-progress-bar">
          <div
            className="bq-progress-fill"
            style={{ width: `${((currentIndex + (selectedAnswer ? 1 : 0)) / BUDGET_QUIZ.length) * 100}%` }}
          />
        </div>
        <span className="bq-progress-text">{currentIndex + 1}/{BUDGET_QUIZ.length}</span>
      </div>
      
      {/* 50/30/20 reference card */}
      <div className="bq-rule-card">
        <div className="bq-rule-segment bq-needs">
          <span className="bq-rule-percent">50%</span>
          <span className="bq-rule-label">Needs</span>
        </div>
        <div className="bq-rule-segment bq-wants">
          <span className="bq-rule-percent">30%</span>
          <span className="bq-rule-label">Wants</span>
        </div>
        <div className="bq-rule-segment bq-saves">
          <span className="bq-rule-percent">20%</span>
          <span className="bq-rule-label">Save</span>
        </div>
      </div>
      
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="bq-question-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <div className="bq-question-badge">
            <Zap size={12} />
            <span>Question {currentIndex + 1}</span>
          </div>
          
          <h3 className="bq-question">{currentQuestion.question}</h3>
          
          <div className="bq-options">
            {currentQuestion.options.map((option, i) => {
              let optClass = 'bq-option';
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
                  <span className="bq-opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="bq-opt-text">{option.text}</span>
                  {selectedAnswer && option.correct && <Check size={16} className="bq-opt-icon correct-icon" />}
                  {selectedAnswer === option.id && !option.correct && <X size={16} className="bq-opt-icon wrong-icon" />}
                </motion.button>
              );
            })}
          </div>
          
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="bq-explanation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="bq-explanation-inner">
                  <Lightbulb size={16} className="bq-explain-icon" />
                  <p>{currentQuestion.explanation}</p>
                </div>
                <button className="btn btn-primary bq-next-btn" onClick={handleNext}>
                  {isLast ? 'Complete Quest' : (
                    <>Next <ChevronRight size={16} /></>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      
      {/* Score tracker */}
      <div className="bq-score-tracker">
        <span className="bq-score-correct">{correctCount} correct</span>
        <span className="bq-score-divider">/</span>
        <span className="bq-score-total">{currentIndex + (selectedAnswer ? 1 : 0)} answered</span>
      </div>
    </div>
  );
}
