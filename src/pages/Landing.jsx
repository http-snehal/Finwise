import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useState, useEffect, useRef } from 'react';
import {
  FileText, Gamepad2, Wallet, Trophy, Play, Coins, Heart,
  Zap, Search, ArrowRight, BookOpen, TrendingUp, Shield,
  Star, Lock, ChevronRight, CheckCircle, LayoutDashboard,
  Users, BarChart2, Flame,
} from 'lucide-react';
import './Landing.css';

// ── Data ────────────────────────────────────────────────────────────────────

const TYPING_PHRASES = [
  'Understand your payslip.',
  'Beat inflation.',
  'Master GST.',
  'Build real wealth.',
];

const STATS = [
  { value: '1.2 Cr+', label: 'First-time earners enter workforce every year' },
  { value: '76%', label: 'Have zero financial plan when they start' },
  { value: '₹14,667', label: 'Average salary lost to deductions nobody explained' },
];

const FEATURES = [
  { icon: BookOpen,   title: 'Learn by Story',            desc: 'Finance feels overwhelming. We make it a story you live — not a textbook you survive.' },
  { icon: LayoutDashboard, title: 'Master Every Topic',   desc: "Salary, taxes, investments, GST — every financial concept you'll ever need, in one place." },
  { icon: Gamepad2,   title: 'Practice Before Reality',   desc: 'Make financial decisions with virtual money first. Build confidence before the stakes are real.' },
  { icon: Zap,        title: 'Build Lasting Habits',      desc: 'Streaks, XP and daily lessons turn financial literacy into a habit — not a one-time crash course.' },
  { icon: TrendingUp, title: 'Your Learning Path',        desc: 'Everyone starts somewhere. FinWise grows with you — from broke student to financially sharp professional.' },
  { icon: Star,       title: 'Learn at Your Own Pace',    desc: 'No deadlines, no pressure. Pick up where you left off — your progress is always saved and waiting for you.' },
];

const HOW_STEPS = [
  { step: '01', icon: BookOpen,  title: 'Listen Story',       desc: 'Laxmi introduces your financial world. Your first salary just landed.' },
  { step: '02', icon: Search,    title: 'Complete Quest',     desc: 'Drag, discover, and play through real salary and tax scenarios.' },
  { step: '03', icon: Gamepad2,  title: 'Play Minigame',      desc: 'Test your knowledge with an interactive budgeting challenge.' },
  { step: '04', icon: Trophy,    title: 'Level Up',           desc: 'Earn XP, unlock badges, and build habits that last a lifetime.' },
];

const MODULES = [
  {
    num: 1, icon: FileText, color: '#10B981',
    title: 'The Paycheck',
    tagline: 'Why is ₹8 LPA only ₹52K in hand?',
    locked: false,
  },
  {
    num: 2, icon: TrendingUp, color: '#3B82F6',
    title: 'Investment',
    tagline: 'Make your money beat inflation.',
    locked: true,
  },
  {
    num: 3, icon: Shield, color: '#8B5CF6',
    title: 'GST',
    tagline: "Every freelancer's nightmare, explained.",
    locked: true,
  },
];

const CHARACTERS = [
  {
    id: 'laxmi',
    name: 'Laxmi',
    role: 'Wise Mentor',
    color: '#FFB800',
    img: '/characters/laxmi.png',
    bio: 'She\'s seen every financial mistake — and exactly how to fix them.',
  },
  {
    id: 'tanmay',
    name: 'Tax-Man Tanmay',
    role: 'The Charming Villain',
    color: '#FF4757',
    img: '/characters/tanmay.png',
    bio: 'He takes your money legally — unless you know his tricks.',
  },
  {
    id: 'iqbal',
    name: 'Inflation Iqbal',
    role: 'The Silent Thief',
    color: '#9C27B0',
    img: '/characters/iqbal.png',
    bio: "You can't see him — but he's shrinking your savings right now.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function TypingEffect({ phrases }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    if (!deleting && displayed.length < phrase.length) {
      timerRef.current = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === phrase.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, deleting, phraseIdx, phrases]);

  return (
    <span className="typing-phrase">
      {displayed}
      <span className="typing-cursor-hero">|</span>
    </span>
  );
}

function XpFloater() {
  return (
    <div className="xp-floater-wrap" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="xp-floater"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -70 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
        >
          <Zap size={11} /> +{[50, 30, 40][i]} XP
        </motion.div>
      ))}
    </div>
  );
}

function RupeeParticles() {
  const SYMBOLS = ['₹', '₹', '◎', '₹', '◎', '₹', '◎', '₹', '₹', '◎', '₹', '◎'];
  return (
    <div className="rupee-particles" aria-hidden="true">
      {SYMBOLS.map((sym, i) => (
        <motion.span
          key={i}
          className="rupee-sym"
          style={{ left: `${(i * 8.5) % 100}%`, animationDelay: `${i * 0.6}s` }}
          animate={{ y: [0, -120, -240], opacity: [0, 0.09, 0] }}
          transition={{ duration: 8 + i * 0.5, repeat: Infinity, delay: i * 0.8, ease: 'linear' }}
        >
          {sym}
        </motion.span>
      ))}
    </div>
  );
}

function AnimatedStat({ value, label, index }) {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const num = parseFloat(value.replace(/[^0-9.]/g, ''));
        const prefix = value.match(/^[^0-9]*/)?.[0] || '';
        const suffix = value.match(/[^0-9.]+$/)?.[0] || '';
        let start = 0;
        const steps = 60;
        const inc = num / steps;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          start += inc;
          if (step >= steps) { clearInterval(timer); setCount(value); }
          else setCount(`${prefix}${num < 10 ? start.toFixed(1) : Math.floor(start)}${suffix}`);
        }, 25);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      style={{ textAlign: 'center' }}
    >
      <span className="stat-number">{count}</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useGame();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goStart = () => navigate(user ? '/dashboard' : '/auth');

  return (
    <div className="landing">
      <div className="grid-overlay" />
      <RupeeParticles />

      {/* ── Floating XP badges ── */}
      <XpFloater />

      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section className="hero" id="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <span className="hero-badge-dot" />
            Built for India's First Jobbers
          </motion.div>

          <h1 className="hero-title">
            <span className="hero-title-line">Fin</span>
            <span className="hero-title-line hero-title-accent">wise</span>
          </h1>

          <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <TypingEffect phrases={TYPING_PHRASES} />
          </motion.p>

          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            The gamified way for India's first jobbers to decode taxes, master investments, and build real wealth.
          </motion.p>



          <motion.div className="hero-cta-area" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <button className="btn btn-primary hero-cta glow-pulse" onClick={goStart} id="start-quest-btn">
              {user ? <><LayoutDashboard size={16} /> Go to Dashboard</> : <><Play size={16} /> Start My Quest — It's Free</>}
            </button>
            <div className="hero-trust-badges">
              <span className="trust-badge"><CheckCircle size={12} /> No credit card</span>
              <span className="trust-badge"><CheckCircle size={12} /> 5 min to start</span>
              <span className="trust-badge"><CheckCircle size={12} /> Built for India</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div className="hero-visual" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
          <div className="hero-card-stack">
            <div className="hero-card hero-card-payslip">
              <div className="hc-header">
                <span className="hc-company">TechNova Solutions</span>
                <span className="hc-month">Payslip · April 2026</span>
              </div>
              <div className="hc-row"><span>Basic Salary</span><span className="hc-earn">₹26,667</span></div>
              <div className="hc-row"><span>HRA</span><span className="hc-earn">₹10,667</span></div>
              <div className="hc-divider" />
              <div className="hc-row"><span>EPF</span><span className="hc-deduct">-₹3,200</span></div>
              <div className="hc-row"><span>TDS</span><span className="hc-deduct">-₹3,733</span></div>
              <div className="hc-divider" />
              <div className="hc-row hc-total"><span>Net Pay</span><span>₹52,000</span></div>
            </div>

            <motion.div className="hero-card hero-card-badge" animate={{ rotate: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity }}>
              <Trophy size={24} className="hcb-icon" />
              <span className="hcb-text">Payslip Pro</span>
              <div className="hcb-xp"><Zap size={12} /><span>+200 XP</span></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          2. STATS BAR
      ═══════════════════════════════════════ */}
      <section className="stats-section" id="stats">
        <div className="stats-row">
          {STATS.map((s, i) => <AnimatedStat key={i} value={s.value} label={s.label} index={i} />)}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. FEATURES
      ═══════════════════════════════════════ */}
      <section className="features-section" id="features">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything you need to master money
        </motion.h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                className="feature-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(26,86,219,0.2)' }}
              >
                <div className="feature-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. HOW IT WORKS — Horizontal timeline
      ═══════════════════════════════════════ */}
      <section className="how-section" id="how">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How Finwise Works
        </motion.h2>
        <div className="how-timeline">
          {HOW_STEPS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="how-timeline-item">
                <motion.div
                  className="how-step-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="how-step-num">{item.step}</div>
                  <div className="how-step-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <h3 className="how-step-title">{item.title}</h3>
                  <p className="how-step-desc">{item.desc}</p>
                </motion.div>
                {i < HOW_STEPS.length - 1 && (
                  <div className="how-connector">
                    <ChevronRight size={18} className="how-connector-icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. MODULE PREVIEW
      ═══════════════════════════════════════ */}
      <section className="modules-section" id="modules">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What's Inside WealthQuest
        </motion.h2>
        <div className="modules-scroll-row">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={i}
                className={`module-card glass ${mod.locked ? 'module-locked' : ''}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={!mod.locked ? { y: -4 } : {}}
              >
                <div className="module-card-top">
                  <div className="module-icon-wrap" style={{ background: `${mod.color}20`, borderColor: `${mod.color}40` }}>
                    <Icon size={22} style={{ color: mod.color }} />
                  </div>
                  <span className="module-num">Module {mod.num}</span>
                </div>
                <h3 className="module-title">{mod.title}</h3>
                <p className="module-tagline">{mod.tagline}</p>
                <div className="module-progress-bar">
                  <div className="module-progress-fill" style={{ width: mod.locked ? '0%' : '0%', background: mod.color }} />
                </div>
                <button
                  className={`module-cta-btn ${mod.locked ? 'module-btn-locked' : 'module-btn-start'}`}
                  onClick={() => !mod.locked && navigate('/quest')}
                  disabled={mod.locked}
                >
                  {mod.locked ? <><Lock size={13} /> Locked</> : <><Play size={13} /> Start <ArrowRight size={13} /></>}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. CHARACTER SHOWCASE
      ═══════════════════════════════════════ */}
      <section className="characters-section" id="characters">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Your Cast
        </motion.h2>
        <motion.p
          className="section-subheading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Three characters. Each with an agenda.
        </motion.p>
        <div className="characters-row">
          {CHARACTERS.map((char, i) => (
            <motion.div
              key={char.id}
              className="char-card glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ rotateY: 3, rotateX: -3, y: -6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="char-emoji-wrap" style={{ borderColor: char.color, boxShadow: `0 0 20px ${char.color}40` }}>
                <img src={char.img} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <span className="char-role-badge" style={{ color: char.color, borderColor: `${char.color}40`, background: `${char.color}15` }}>
                {char.role}
              </span>
              <h3 className="char-name">{char.name}</h3>
              <p className="char-bio">{char.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="final-cta" id="cta">
        <motion.div
          className="final-cta-inner glass"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="final-cta-badge">
            <Flame size={14} /> 10,000+ first jobbers already playing
          </div>
          <h2>Your first payslip already arrived.</h2>
          <h2 className="final-cta-accent">Do you understand it?</h2>
          <p>Join 10,000+ first jobbers who stopped guessing and started knowing.</p>
          <button className="btn btn-primary hero-cta glow-pulse final-cta-btn" onClick={goStart}>
            <Play size={16} />
            Start My Quest — It's Free
            <ArrowRight size={16} />
          </button>
          <div className="hero-trust-badges final-trust">
            <span className="trust-badge"><CheckCircle size={12} /> No credit card</span>
            <span className="trust-badge"><CheckCircle size={12} /> 5 min to start</span>
            <span className="trust-badge"><CheckCircle size={12} /> Built for India</span>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <div className="footer-logo">
            <Coins size={18} />
            <span>WealthQuest</span>
          </div>
          <span className="footer-tagline">
            Duolingo for Money — Built with <Heart size={12} className="footer-heart" /> for India's First Jobbers
          </span>
        </div>
      </footer>

      {/* ═══════════════════════════════════════
          8. MOBILE STICKY CTA
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            className="sticky-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <button className="btn btn-primary sticky-cta-btn" onClick={goStart}>
              <Play size={14} /> Start Quest — Free
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
