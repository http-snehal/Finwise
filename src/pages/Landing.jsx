import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useState } from 'react';
import {
  FileText, Gamepad2, Wallet, Trophy, Play, Swords,
  Clapperboard, AlertCircle, Search, Dumbbell,
  Code, PenTool, Briefcase, Coins, Zap, Heart,
  LayoutDashboard
} from 'lucide-react';
import './Landing.css';

const FEATURES = [
  { icon: FileText, title: 'Payslip Decoded', desc: 'Understand CTC, TDS, EPF — through story, not formulas' },
  { icon: Gamepad2, title: 'Learn by Playing', desc: 'RPG quests, not boring lectures. Every concept is a game' },
  { icon: Wallet, title: 'Budget Like a Pro', desc: 'Master the 50/30/20 rule with interactive challenges' },
  { icon: Trophy, title: 'Earn & Level Up', desc: 'XP, badges, streaks — show off your financial mastery' },
];

const TESTIMONIALS = [
  { text: '"I finally understand why my in-hand is ₹52K and not ₹66K!"', name: 'Priya, SDE-1', icon: Code },
  { text: '"Wish I had this when I got my first offer letter."', name: 'Rahul, Product Analyst', icon: Briefcase },
  { text: '"The Tax-Man character is hilarious."', name: 'Ananya, UI Designer', icon: PenTool },
];

export default function Landing() {
  const navigate = useNavigate();
  const { setPlayerName, user } = useGame();
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
      
      {/* Floating particles — decorative dots instead of emoji */}
      <div className="landing-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-dot"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
              background: ['var(--neon-primary)', 'var(--gold-primary)', 'var(--success)', 'var(--neon-secondary)'][i % 4],
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
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
            <span className="hero-title-line">Fin</span>
            <span className="hero-title-line hero-title-accent">wise</span>
          </h1>
          
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Coins size={18} className="hero-tagline-icon" />
            Master Your Finances
          </motion.p>
          
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Master Your Money, One Quest at a Time.
            <br />
            The gamified way for India's first-jobbers to decode taxes, master investments, and build real wealth. Built for the modern Indian professional.
          </motion.p>
          
          <motion.div
            className="hero-cta-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {user ? (
              <button className="btn btn-primary hero-cta" onClick={() => navigate('/dashboard')} id="start-quest-btn">
                <LayoutDashboard size={16} /> Go to Dashboard
              </button>
            ) : (
              <button className="btn btn-primary hero-cta" onClick={() => navigate('/auth')} id="start-quest-btn">
                <Play size={16} /> Get Started
              </button>
            )}
            
            <span className="hero-cta-subtext">
              10 min adventure · 100% free
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
                <span className="hc-month">Payslip · April 2026</span>
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
              <Trophy size={24} className="hcb-icon" />
              <span className="hcb-text">Payslip Pro</span>
              <div className="hcb-xp">
                <Zap size={12} />
                <span>+200 XP</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                className="feature-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
              >
                <div className="feature-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="how-section">
        <h2 className="section-heading">How Finwise Works</h2>
        <div className="how-steps">
          {[
            { step: '01', title: 'Start Your Story', desc: 'Experience getting your first job offer — ₹8 LPA!', icon: Clapperboard },
            { step: '02', title: 'The Surprise', desc: 'Your payslip says ₹52,000. Wait, what happened?!', icon: AlertCircle },
            { step: '03', title: 'Decode & Learn', desc: 'Discover CTC, TDS, EPF through interactive quests', icon: Search },
            { step: '04', title: 'Master Your Money', desc: 'Budget your salary. Earn badges. Level up!', icon: Dumbbell },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
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
                  <div className="how-step-icon-wrap">
                    <Icon size={18} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                {i < 3 && <div className="how-step-connector" />}
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-heading">What First Jobbers Say</h2>
        <div className="testimonials-row">
          {TESTIMONIALS.map((t, i) => {
            const Icon = t.icon;
            return (
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
                  <div className="testimonial-icon-wrap">
                    <Icon size={16} />
                  </div>
                  <span className="testimonial-name">{t.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="final-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Decode Your Salary?</h2>
          <p>Join thousands of first jobbers who finally understand their payslip.</p>
          <button className="btn btn-primary hero-cta" onClick={() => navigate('/quest')}>
            <Play size={16} /> Start Quest Now
          </button>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <div className="footer-logo">
            <Coins size={18} />
            <span>WealthQuest</span>
          </div>
          <span className="footer-tagline">Duolingo for Money — Built with <Heart size={12} className="footer-heart" /> for India's First Jobbers</span>
        </div>
      </footer>
    </div>
  );
}
