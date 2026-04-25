import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTERS } from '../data/storyData';
import './DialogueBox.css';

export default function DialogueBox({ dialogues, onComplete, autoAdvance = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showHighlight, setShowHighlight] = useState(false);
  const timeoutRef = useRef(null);
  const typingRef = useRef(null);
  
  const current = dialogues[currentIndex];
  const character = CHARACTERS[current?.character] || CHARACTERS.narrator;
  const isLast = currentIndex === dialogues.length - 1;
  
  // Typewriter effect
  useEffect(() => {
    if (!current) return;
    
    setDisplayedText('');
    setIsTyping(true);
    setShowHighlight(false);
    
    const text = current.text;
    let charIndex = 0;
    
    typingRef.current = setInterval(() => {
      charIndex++;
      setDisplayedText(text.slice(0, charIndex));
      
      if (charIndex >= text.length) {
        clearInterval(typingRef.current);
        setIsTyping(false);
        if (current.highlight) {
          setTimeout(() => setShowHighlight(true), 300);
        }
      }
    }, 22);
    
    return () => {
      clearInterval(typingRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, current]);
  
  const handleAdvance = () => {
    if (isTyping) {
      // Skip to end of current text
      clearInterval(typingRef.current);
      setDisplayedText(current.text);
      setIsTyping(false);
      if (current.highlight) {
        setTimeout(() => setShowHighlight(true), 200);
      }
      return;
    }
    
    if (isLast) {
      onComplete?.();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  if (!current) return null;
  
  const moodClass = current.mood || 'neutral';
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className={`dialogue-container mood-${moodClass}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onClick={handleAdvance}
      >
        {/* Notification style for SMS */}
        {current.isNotification && (
          <motion.div
            className="sms-notification"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
          >
            <div className="sms-header">
              <span className="sms-icon">🏦</span>
              <span className="sms-bank">AXIS BANK</span>
              <span className="sms-time">3:47 PM</span>
            </div>
            <div className="sms-body">
              <span className="sms-amount">₹52,000</span>
              <span className="sms-detail">Credited from TechNova Solutions Pvt Ltd</span>
            </div>
          </motion.div>
        )}
        
        <div className="dialogue-box">
          {/* Character portrait area */}
          <div className="dialogue-portrait" style={{ '--char-color': character.color }}>
            <div className="portrait-frame">
              {character.avatar ? (
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="portrait-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="portrait-emoji" style={character.avatar ? { display: 'none' } : {}}>
                {character.fallbackEmoji}
              </div>
            </div>
            <div className="portrait-name-badge">
              <span className="portrait-name">{character.name}</span>
              {character.role && <span className="portrait-role">{character.role}</span>}
            </div>
          </div>
          
          {/* Speech bubble */}
          <div className="dialogue-speech">
            <p className="dialogue-text">
              {displayedText}
              {isTyping && <span className="typing-cursor">▌</span>}
            </p>
            
            {showHighlight && current.highlight && (
              <motion.div
                className="highlight-badge"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                {current.highlight}
              </motion.div>
            )}
          </div>
          
          {/* Advance indicator */}
          <div className="dialogue-advance">
            {!isTyping && (
              <motion.span
                className="advance-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isLast ? '✨ Continue' : 'Tap to continue ▸'}
              </motion.span>
            )}
          </div>
        </div>
        
        {/* Progress dots */}
        <div className="dialogue-progress">
          {dialogues.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'completed' : ''}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
