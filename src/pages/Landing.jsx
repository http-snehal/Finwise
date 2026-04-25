import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useState } from 'react';
import './Landing.css';

const FEATURES = [
  { emoji: '📋', title: 'Payslip Decoded', desc: 'Understand CTC, TDS, EPF — through story, not formulas' },
  { emoji: '🎮', title: 'Learn by Playing', desc: 'RPG quests, not boring lectures. Every concept is a game' },
  { emoji: '💰', title: 'Budget Like a Pro', desc: 'Master the 50/30/20 rule with interactive challenges' },
  { emoji: '🏆', title: 'Earn & Flex', desc: 'XP, badges, streaks — show off your financial mastery' },
];

const TESTIMONIALS = [
  { text: '"I finally understand why my in-hand is ₹52K and not ₹66K!"', name: 'Priya, SDE-1', emoji: '👩‍💻' },
  { text: '"Wish I had this when I got my first offer letter."', name: 'Rahul, Product Analyst', emoji: '👨‍💼' },
  { text: '"The Tax-Man character is hilarious 😂"', name: 'Ananya, UI Designer', emoji: '👩‍🎨' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { setPlayerName } = useGame();
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  
  const handleStart = () => {
    if (!showNameInput) {
      setShowNameInput(true);
      return;
    }
    if (name.trim()) {
      setPlayerName(name.trim());
    }
    navigate('/quest');
  };
  
  return (
    <div className="landing">
      <div className="grid-overlay" />
      
      {/* Floating particles */}
      <div className="landing-particles">
        {['💰', '📊', '🎯', '⚡', '🔥', '🏆', '💎', '📋'].map((emoji, i) => (
          <motion.span
            key={i}
            className="floating-particle"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
      
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="hero-badge-dot" />
            Built for India's First Jobbers
          </motion.div>
          
          <h1 className="hero-title">
            <span className="hero-title-line">Wealth</span>
            <span className="hero-title-line hero-title-accent">Quest</span>
          </h1>
          
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Duolingo for Money 💰
          </motion.p>
          
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Signed for <span className="highlight-ctc">₹8 LPA</span> but got <span className="highlight-inhand">₹52,000</span> in-hand?
            <br />
            Understand your payslip in 10 minutes — and actually enjoy it.
          </motion.p>
          
          <motion.div
            className="hero-cta-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {showNameInput && (
              <motion.div
                className="name-input-wrapper"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <input
                  type="text"
                  className="name-input"
                  placeholder="Enter your name, adventurer..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  autoFocus
                  maxLength={20}
                />
              </motion.div>
            )}
            
            <button className="btn btn-primary hero-cta" onClick={handleStart} id="start-quest-btn">
              {showNameInput ? '⚔️ Begin Your Quest' : '🎮 Start Quest'}
            </button>
            
            <span className="hero-cta-subtext">
              No sign-up required • 10 min adventure • 100% free
            </span>
          </motion.div>
        </motion.div>
        
        {/* Hero Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="hero-card-stack">
            <div className="hero-card hero-card-payslip">
              <div className="hc-header">
                <span className="hc-company">TechNova Solutions</span>
                <span className="hc-month">Payslip • April 2026</span>
              </div>
              <div className="hc-row">
                <span>Basic Salary</span>
                <span className="hc-earn">₹26,667</span>
              </div>
              <div className="hc-row">
                <span>HRA</span>
                <span className="hc-earn">₹10,667</span>
              </div>
              <div className="hc-divider" />
              <div className="hc-row">
                <span>EPF</span>
                <span className="hc-deduct">-₹3,200</span>
              </div>
              <div className="hc-row">
                <span>TDS</span>
                <span className="hc-deduct">-₹3,733</span>
              </div>
              <div className="hc-divider" />
              <div className="hc-row hc-total">
                <span>Net Pay</span>
                <span>₹52,000</span>
              </div>
            </div>
            
            <motion.div
              className="hero-card hero-card-badge"
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="hcb-emoji">🏆</span>
              <span className="hcb-text">Payslip Pro</span>
              <span className="hcb-xp">+200 XP</span>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
            >
              <span className="feature-emoji">{feature.emoji}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="how-section">
        <h2 className="section-heading">How WealthQuest Works</h2>
        <div className="how-steps">
          {[
            { step: '01', title: 'Start Your Story', desc: 'Experience getting your first job offer — ₹8 LPA!', emoji: '🎬' },
            { step: '02', title: 'The Surprise', desc: 'Your payslip says ₹52,000. Wait, what happened?!', emoji: '😱' },
            { step: '03', title: 'Decode & Learn', desc: 'Discover CTC, TDS, EPF through interactive quests', emoji: '🔍' },
            { step: '04', title: 'Master Your Money', desc: 'Budget your salary. Earn badges. Level up! 🚀', emoji: '💪' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="how-step"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="how-step-number">{item.step}</div>
              <div className="how-step-content">
                <span className="how-step-emoji">{item.emoji}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              {i < 3 && <div className="how-step-connector" />}
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-heading">What First Jobbers Say</h2>
        <div className="testimonials-row">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar">{t.emoji}</span>
                <span className="testimonial-name">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="final-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Decode Your Salary? 🚀</h2>
          <p>Join thousands of first jobbers who finally understand their payslip.</p>
          <button className="btn btn-primary hero-cta" onClick={() => navigate('/quest')}>
            Start Quest Now ⚔️
          </button>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <span className="footer-logo">💰 WealthQuest</span>
          <span className="footer-tagline">Duolingo for Money — Built with ❤️ for India's First Jobbers</span>
        </div>
      </footer>
    </div>
  );
}
