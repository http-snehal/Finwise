import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Volume2, Landmark, BookOpen } from 'lucide-react';
import { CHARACTERS } from '../data/storyData';
import { playSound } from '../utils/audio';
import './DialogueBox.css';

export default function DialogueBox({ dialogues, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showHighlight, setShowHighlight] = useState(false);
  const typingRef = useRef(null);
  const hasPlayedAudio = useRef(false);
  const completedRef = useRef(false);
  
  const current = dialogues[currentIndex];
  const character = CHARACTERS[current?.character] || CHARACTERS.narrator;
  const isLast = currentIndex === dialogues.length - 1;
  
  // Typewriter effect + auto-play audio
  useEffect(() => {
    if (!current) return;
    
    setDisplayedText('');
    setIsTyping(true);
    setShowHighlight(false);
    hasPlayedAudio.current = false;
    
    // Auto-play audio on each new dialogue line
    if (current.audio && !hasPlayedAudio.current) {
      hasPlayedAudio.current = true;
      playSound(current.audio);
    }
    
    const text = current.text;
    let charIndex = 0;
    
    typingRef.current = setInterval(() => {
      charIndex++;
      setDisplayedText(text.slice(0, charIndex));
      
      if (charIndex >= text.length) {
        clearInterval(typingRef.current);
        setIsTyping(false);
        if (current.highlight) {
          setTimeout(() => setShowHighlight(true), 200);
        }
      }
    }, 25);
    
    return () => clearInterval(typingRef.current);
  }, [currentIndex, current]);
  
  const handleAdvance = () => {
    if (isTyping) {
      clearInterval(typingRef.current);
      setDisplayedText(current.text);
      setIsTyping(false);
      if (current.highlight) {
        setTimeout(() => setShowHighlight(true), 100);
      }
      return;
    }
    
    if (isLast) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  if (!current) return null;
  
  const moodClass = current.mood || 'neutral';
  
  return (
    <div className={`dialogue-fullscreen mood-${moodClass}`} onClick={handleAdvance}>
      {/* Villain entry: fullscreen red flash */}
      <AnimatePresence>
        {current.mood === 'villain-entry' && (
          <motion.div
            key={`vflash-${currentIndex}`}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(255,71,87,0.12)',
              pointerEvents: 'none', zIndex: 48,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* SMS notification card (for salary credit scene) */}
      <AnimatePresence>
        {current.isNotification && (
          <motion.div
            className="sms-notification"
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          >
            <div className="sms-header">
              <Landmark size={16} className="sms-icon-lucide" />
              <span className="sms-bank">AXIS BANK</span>
              <span className="sms-time">3:47 PM</span>
            </div>
            <div className="sms-body">
              <span className="sms-amount">₹52,000</span>
              <span className="sms-detail">Credited from TechNova Solutions</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Highlight badge (for amounts) */}
      <AnimatePresence>
        {showHighlight && current.highlight && (
          <motion.div
            className="dialogue-highlight-badge"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {current.highlight}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Character Portrait */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`portrait-${current.character}`}
          className="dialogue-character-portrait"
          style={{ '--char-color': character.color }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {character.avatar ? (
            <img
              src={character.avatar}
              alt={character.name}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="portrait-fallback" style={character.avatar ? { display: 'none' } : {}}>
            <BookOpen size={48} />
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Bottom dialogue panel — Duolingo style */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`dialogue-bottom-panel mood-${moodClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Character row */}
          <div className="dialogue-char-row" style={{ '--char-color': character.color }}>
            <div className="dialogue-avatar">
              {character.avatar ? (
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="dialogue-avatar-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="dialogue-avatar-fallback" style={character.avatar ? { display: 'none' } : {}}>
                <Volume2 size={18} />
              </div>
            </div>
            <div className="dialogue-char-info">
              <span className="dialogue-char-name">{character.name}</span>
              <span className="dialogue-char-role">{character.role}</span>
            </div>
            {current.audio && (
              <div className="dialogue-audio-indicator">
                <Volume2 size={14} />
              </div>
            )}
          </div>
          
          {/* Speech text */}
          <p className="dialogue-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
          
          {/* Tap to continue */}
          {!isTyping && (
            <motion.div
              className="dialogue-continue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="continue-text">{isLast ? 'Continue' : 'Tap anywhere'}</span>
              <ChevronRight size={16} className="continue-icon" />
            </motion.div>
          )}
          
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
    </div>
  );
}
