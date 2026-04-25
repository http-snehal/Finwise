import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTC_COMPONENTS, CTC_QUIZ } from '../data/storyData';
import { useGame } from '../contexts/GameContext';
import './CTCBreakdown.css';

export default function CTCBreakdown({ onComplete }) {
  const [revealedCards, setRevealedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [phase, setPhase] = useState('explore'); // explore | quiz | complete
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const { addXp, loseHeart, hearts } = useGame();
  
  const earnings = CTC_COMPONENTS.filter(c => c.type === 'earning');
  const deductions = CTC_COMPONENTS.filter(c => c.type === 'deduction');
  const employerCosts = CTC_COMPONENTS.filter(c => c.type === 'employer-cost');
  
  const allRevealed = revealedCards.length >= CTC_COMPONENTS.length;
  
  const handleCardClick = (component) => {
    setSelectedCard(component);
    if (!revealedCards.includes(component.id)) {
      setRevealedCards(prev => [...prev, component.id]);
      addXp(15);
    }
  };
  
  const handleCloseDetail = () => {
    setSelectedCard(null);
    if (allRevealed || revealedCards.length >= CTC_COMPONENTS.length - 1) {
      // Check after closing if all revealed
      setTimeout(() => {
        if (revealedCards.length >= CTC_COMPONENTS.length - 1) {
          setPhase('quiz');
        }
      }, 300);
    }
  };
  
  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option.id);
    
    const currentQuestion = CTC_QUIZ[currentQuizIndex];
    
    if (option.correct) {
      addXp(currentQuestion.xpReward);
    } else {
      loseHeart();
    }
    
    setTimeout(() => setShowExplanation(true), 600);
  };
  
  const handleNextQuestion = () => {
    if (currentQuizIndex < CTC_QUIZ.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setPhase('complete');
      setTimeout(() => onComplete?.(), 500);
    }
  };
  
  const totalEarnings = earnings.reduce((s, c) => s + c.monthlyAmount, 0);
  const totalDeductions = deductions.reduce((s, c) => s + c.monthlyAmount, 0);
  const totalEmployer = employerCosts.reduce((s, c) => s + c.monthlyAmount, 0);
  const inHand = totalEarnings - totalDeductions;
  
  return (
    <div className="ctc-breakdown">
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ctc-explorer"
        >
          <div className="ctc-header">
            <h2 className="ctc-title">Your Payslip Decoded</h2>
            <p className="ctc-subtitle">
              Tap each card to discover where your money goes
            </p>
            <div className="ctc-progress-bar">
              <div
                className="ctc-progress-fill"
                style={{ width: `${(revealedCards.length / CTC_COMPONENTS.length) * 100}%` }}
              />
              <span className="ctc-progress-text">
                {revealedCards.length}/{CTC_COMPONENTS.length} discovered
              </span>
            </div>
          </div>
          
          {/* Summary Numbers */}
          <div className="ctc-summary">
            <div className="ctc-summary-item ctc-ctc">
              <span className="summary-label">Monthly CTC</span>
              <span className="summary-value">₹{(66667).toLocaleString('en-IN')}</span>
            </div>
            <div className="ctc-summary-arrow">→</div>
            <div className="ctc-summary-item ctc-inhand">
              <span className="summary-label">In-Hand</span>
              <span className="summary-value">₹{inHand.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          {/* Earnings */}
          <div className="ctc-section">
            <h3 className="section-title section-earnings">
              <span className="section-icon">💰</span> Earnings
              <span className="section-total">₹{totalEarnings.toLocaleString('en-IN')}/mo</span>
            </h3>
            <div className="ctc-cards">
              {earnings.map((component, i) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isRevealed={revealedCards.includes(component.id)}
                  onClick={() => handleCardClick(component)}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
          
          {/* Deductions */}
          <div className="ctc-section">
            <h3 className="section-title section-deductions">
              <span className="section-icon">📉</span> Deductions
              <span className="section-total">-₹{totalDeductions.toLocaleString('en-IN')}/mo</span>
            </h3>
            <div className="ctc-cards">
              {deductions.map((component, i) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isRevealed={revealedCards.includes(component.id)}
                  onClick={() => handleCardClick(component)}
                  delay={i * 0.1}
                  isDeduction
                />
              ))}
            </div>
          </div>
          
          {/* Employer Costs */}
          <div className="ctc-section">
            <h3 className="section-title section-employer">
              <span className="section-icon">🏢</span> Employer Costs (Hidden in CTC)
              <span className="section-total">₹{totalEmployer.toLocaleString('en-IN')}/mo</span>
            </h3>
            <div className="ctc-cards">
              {employerCosts.map((component, i) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isRevealed={revealedCards.includes(component.id)}
                  onClick={() => handleCardClick(component)}
                  delay={i * 0.1}
                  isEmployer
                />
              ))}
            </div>
          </div>
          
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ctc-all-revealed"
            >
              <p>🎉 All components discovered! Time for a quick quiz!</p>
              <button className="btn btn-primary" onClick={() => setPhase('quiz')}>
                Start Quiz ⚡
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="card-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetail}
          >
            <motion.div
              className={`card-detail ${selectedCard.type === 'deduction' ? 'detail-deduction' : selectedCard.type === 'employer-cost' ? 'detail-employer' : 'detail-earning'}`}
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="detail-icon">{selectedCard.icon}</div>
              <h3 className="detail-name">{selectedCard.name}</h3>
              <div className="detail-amounts">
                <div className="detail-amount-item">
                  <span className="detail-amount-label">Monthly</span>
                  <span className="detail-amount-value">
                    {selectedCard.type === 'deduction' ? '-' : ''}₹{selectedCard.monthlyAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="detail-amount-item">
                  <span className="detail-amount-label">Annual</span>
                  <span className="detail-amount-value">
                    {selectedCard.type === 'deduction' ? '-' : ''}₹{selectedCard.annualAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <p className="detail-description">{selectedCard.description}</p>
              <div className="detail-reveal">
                <span className="detail-reveal-icon">💡</span>
                <span className="detail-reveal-text">{selectedCard.revealText}</span>
              </div>
              <button className="btn btn-outline" onClick={handleCloseDetail}>Got it! ✓</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Quiz Phase */}
      {phase === 'quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ctc-quiz"
        >
          <div className="quiz-header">
            <span className="quiz-badge">⚡ KNOWLEDGE CHECK</span>
            <span className="quiz-count">{currentQuizIndex + 1}/{CTC_QUIZ.length}</span>
          </div>
          
          <h3 className="quiz-question">{CTC_QUIZ[currentQuizIndex].question}</h3>
          
          <div className="quiz-options">
            {CTC_QUIZ[currentQuizIndex].options.map((option, i) => {
              let optClass = 'quiz-option';
              if (selectedAnswer) {
                if (option.correct) optClass += ' correct';
                else if (option.id === selectedAnswer && !option.correct) optClass += ' wrong';
              }
              
              return (
                <motion.button
                  key={option.id}
                  className={optClass}
                  onClick={() => handleAnswer(option)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  disabled={!!selectedAnswer}
                >
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="option-text">{option.text}</span>
                  {selectedAnswer && option.correct && <span className="option-check">✓</span>}
                  {selectedAnswer === option.id && !option.correct && <span className="option-cross">✗</span>}
                </motion.button>
              );
            })}
          </div>
          
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="quiz-explanation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p>{CTC_QUIZ[currentQuizIndex].explanation}</p>
                <button className="btn btn-primary" onClick={handleNextQuestion}>
                  {currentQuizIndex < CTC_QUIZ.length - 1 ? 'Next Question →' : 'Complete Quest! 🏆'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function ComponentCard({ component, isRevealed, onClick, delay = 0, isDeduction = false, isEmployer = false }) {
  return (
    <motion.div
      className={`component-card ${isRevealed ? 'revealed' : 'locked'} ${isDeduction ? 'card-deduction' : ''} ${isEmployer ? 'card-employer' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card-left">
        <span className="card-icon">{isRevealed ? component.icon : '❓'}</span>
        <div className="card-info">
          <span className="card-name">{isRevealed ? component.name : 'Tap to Discover'}</span>
          {isRevealed && (
            <span className="card-amount">
              {isDeduction ? '-' : ''}₹{component.monthlyAmount.toLocaleString('en-IN')}/mo
            </span>
          )}
        </div>
      </div>
      <div className="card-right">
        {isRevealed ? (
          <span className="card-status revealed-status">✓</span>
        ) : (
          <span className="card-status locked-status">🔒</span>
        )}
      </div>
    </motion.div>
  );
}
