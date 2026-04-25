import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { playCorrect, playWrong } from '../utils/audio';
import { CHARACTERS } from '../data/storyData';
import { Check, X, ChevronRight, MessageCircleQuestion } from 'lucide-react';
import './SocraticDialogue.css';

export default function SocraticDialogue({ questData, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const { addXp, loseHeart } = useGame();
  
  const currentBeat = questData[currentIndex];
  const speaker = CHARACTERS[currentBeat?.speaker] || CHARACTERS.laxmi;
  const isLast = currentIndex === questData.length - 1;
  
  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option.id);
    
    if (option.correct) {
      playCorrect();
      addXp(currentBeat.xpReward);
    } else {
      playWrong();
      loseHeart();
    }
    
    setTimeout(() => setShowFeedback(true), 400);
  };
  
  const handleNext = () => {
    if (isComplete) return;

    if (isLast) {
      setIsComplete(true);
      onComplete?.();
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };
  
  return (
    <div className="socratic-dialogue">
      {/* Header */}
      <div className="sd-header">
        <div className="sd-title-row">
          <MessageCircleQuestion size={20} className="sd-title-icon" />
          <h2 className="sd-title">The Money Talk</h2>
        </div>
        
        {/* Progress */}
        <div className="sd-progress-bar">
          <div
            className="sd-progress-fill"
            style={{ width: `${((currentIndex + (selectedAnswer ? 1 : 0)) / questData.length) * 100}%` }}
          />
        </div>
        <span className="sd-progress-text">{currentIndex + 1}/{questData.length}</span>
      </div>
      
      {/* Dialogue Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="sd-content-area"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {/* Speaker Bubble */}
          <div className="sd-speaker-row" style={{ '--speaker-color': speaker.color }}>
            <div className="sd-avatar">
              <img src={speaker.avatar} alt={speaker.name} />
            </div>
            <div className="sd-bubble-container">
              <span className="sd-speaker-name">{speaker.name}</span>
              <div className="sd-speech-bubble glass">
                {currentBeat.text}
              </div>
            </div>
          </div>
          
          {/* Options */}
          <div className="sd-options">
            {currentBeat.options.map((option, i) => {
              let optClass = 'sd-option glass';
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
                  transition={{ delay: 0.2 + i * 0.1 }}
                  disabled={!!selectedAnswer}
                >
                  <span className="sd-opt-text">{option.text}</span>
                  {selectedAnswer && option.correct && <Check size={16} className="sd-opt-icon correct-icon" />}
                  {selectedAnswer === option.id && !option.correct && <X size={16} className="sd-opt-icon wrong-icon" />}
                </motion.button>
              );
            })}
          </div>
          
          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                className="sd-feedback"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className={`sd-feedback-inner ${currentBeat.options.find(o => o.id === selectedAnswer)?.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <p>{currentBeat.options.find(o => o.id === selectedAnswer)?.feedback}</p>
                </div>
                <button className="btn btn-primary sd-next-btn" onClick={handleNext}>
                  {isLast ? 'Complete' : (
                    <>Next <ChevronRight size={16} /></>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
