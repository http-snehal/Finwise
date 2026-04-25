// =========================================
// WealthQuest — Story Script Data v2
// Short, punchy Duolingo-style dialogues.
// Max ~12 words per line. Lucide icon names.
// =========================================

export const CHARACTERS = {
  tanmay: {
    id: 'tanmay',
    name: 'Tax-Man Tanmay',
    role: 'The Charming Villain',
    avatar: '/characters/tanmay.png',
    lucideIcon: 'skull',
    color: '#FF4757',
  },
  laxmi: {
    id: 'laxmi',
    name: 'Laxmi',
    role: 'The Wise Mentor',
    avatar: '/characters/laxmi.png',
    lucideIcon: 'sparkles',
    color: '#FFB800',
  },
  narrator: {
    id: 'narrator',
    name: 'Narrator',
    role: 'Story Guide',
    avatar: null,
    lucideIcon: 'book-open',
    color: '#10B981',
  },
  hr: {
    id: 'hr',
    name: 'HR Manager',
    role: 'The Offer Bearer',
    avatar: null,
    lucideIcon: 'briefcase',
    color: '#059669',
  },
  player: {
    id: 'player',
    name: 'You',
    role: 'The First Jobber',
    avatar: null,
    lucideIcon: 'user',
    color: '#00E676',
  },
  iqbal: {
    id: 'iqbal',
    name: 'Inflation Iqbal',
    role: 'The Money Eater',
    avatar: '/characters/iqbal.png',
    lucideIcon: 'trending-down',
    color: '#9C27B0',
  },
};

// ===========================
// STAGE 1: The Interview & The Rude Awakening (Story)
// ===========================
export const STAGE_1_DIALOGUE = [
  {
    character: 'narrator',
    text: "You aced the interviews. The offer email just dropped.",
    mood: 'dramatic',
    audio: 'whoosh',
  },
  {
    character: 'hr',
    text: "Congratulations! Your CTC is 8 Lakhs Per Annum!",
    mood: 'excited',
    audio: 'success',
    highlight: '₹8,00,000',
  },
  {
    character: 'player',
    text: "8 LAKHS! Wait till I tell mom and dad!",
    mood: 'ecstatic',
    audio: 'pop',
  },
  {
    character: 'narrator',
    text: "Offer signed. Instagram story posted. Life is good.",
    mood: 'warm',
    audio: 'chime',
  },
  {
    character: 'narrator',
    text: "Fast forward 30 days. SALARY DAY arrives.",
    mood: 'suspense',
    audio: 'suspense',
  },
  {
    character: 'narrator',
    text: "Bank notification: Credited ₹52,000.",
    mood: 'reveal',
    highlight: '₹52,000',
    isNotification: true,
    audio: 'notification',
  },
  {
    character: 'player',
    text: "Wait — where did ₹14,667 go?!",
    mood: 'confused',
    audio: 'error',
  },
  {
    character: 'tanmay',
    text: "No mistake, friend. Some came to me. I'm Tax-Man Tanmay.",
    mood: 'villain-entry',
    audio: 'villain',
  },
  {
    character: 'laxmi',
    text: "Don't worry. I'm Laxmi. Let's decode your payslip together.",
    mood: 'warm',
    audio: 'mentor',
  },
  {
    character: 'laxmi',
    text: "CTC means Cost to Company. It's their expense, not your take-home pay.",
    mood: 'warm',
    audio: 'mentor',
  },
  {
    character: 'laxmi',
    text: "Your CTC is split into earnings (like Basic) and deductions (like Taxes).",
    mood: 'warm',
    audio: 'mentor',
  },
  {
    character: 'laxmi',
    text: "Let's play Payslip Detective and uncover exactly where your money went!",
    mood: 'warm',
    audio: 'mentor',
  },
];

// ===========================
// STAGE 3: Payslip Detective — Blurred lines + MCQ per item
// Each payslip line has a question the user must answer to reveal it
// ===========================
export const PAYSLIP_LINES = [
  {
    id: 'basic',
    label: 'Basic Salary',
    amount: 26667,
    type: 'earning',
    lucideIcon: 'banknote',
    explanation: "Basic is typically 40% of CTC. It's the base for HRA, EPF, and other calculations.",
    character: 'laxmi',
    xpReward: 30,
  },
  {
    id: 'hra',
    label: 'HRA (House Rent Allowance)',
    amount: 10667,
    type: 'earning',
    lucideIcon: 'home',
    explanation: "HRA covers rent expenses. If you actually pay rent, you can claim tax exemption under Section 10(13A)!",
    character: 'laxmi',
    xpReward: 30,
  },
  {
    id: 'special',
    label: 'Special Allowance',
    amount: 10000,
    type: 'earning',
    lucideIcon: 'sparkles',
    explanation: "Special Allowance is a catch-all component. It's fully taxable but goes directly to your bank account.",
    character: 'laxmi',
    xpReward: 30,
  },
  {
    id: 'epf',
    label: 'EPF (Employee Contribution)',
    amount: -3200,
    type: 'deduction',
    lucideIcon: 'lock',
    explanation: "EPF is YOUR money! 12% of basic goes into your retirement account, earning ~8.15% interest. Both you AND your employer contribute.",
    character: 'laxmi',
    xpReward: 40,
  },
  {
    id: 'ptax',
    label: 'Professional Tax',
    amount: -200,
    type: 'deduction',
    lucideIcon: 'file-text',
    explanation: "Professional Tax is a small state-level tax. It's capped at ₹2,500/year. Small but unavoidable!",
    character: 'tanmay',
    xpReward: 30,
  },
  {
    id: 'tds',
    label: 'TDS (Tax Deducted at Source)',
    amount: -3733,
    type: 'deduction',
    lucideIcon: 'landmark',
    explanation: "TDS = Tax Deducted at Source. Your employer estimates your annual tax and deducts it monthly. You can reduce it with 80C investments!",
    character: 'tanmay',
    xpReward: 40,
  },
];

// ===========================
// STAGE 4: Salary Allotment — MCQ format (not slider)
// ===========================
export const BUDGET_QUIZ = [
  {
    id: 'bq1',
    question: "You earn ₹52,000/month. What's the ideal split according to the 50/30/20 rule?",
    options: [
      { id: 'a', text: '₹26K needs, ₹15.6K wants, ₹10.4K savings', correct: true },
      { id: 'b', text: '₹40K needs, ₹10K wants, ₹2K savings', correct: false },
      { id: 'c', text: '₹20K needs, ₹20K wants, ₹12K savings', correct: false },
    ],
    explanation: "50/30/20 means 50% for Needs (₹26K), 30% for Wants (₹15.6K), and 20% for Savings (₹10.4K).",
    xpReward: 40,
  },
  {
    id: 'bq2',
    question: 'Rent, groceries, and transport fall under which category?',
    options: [
      { id: 'a', text: 'Wants — things you enjoy', correct: false },
      { id: 'b', text: 'Needs — essential expenses', correct: true },
      { id: 'c', text: 'Savings — future investments', correct: false },
    ],
    explanation: "Rent, groceries, and transport are Needs — essentials you can't skip. They should be ~50% of income.",
    xpReward: 30,
  },
  {
    id: 'bq3',
    question: 'Your friend says "Save whatever is left at month-end." Good advice?',
    options: [
      { id: 'a', text: 'Yes — save what you can!', correct: false },
      { id: 'b', text: 'No — save FIRST, spend the rest', correct: true },
      { id: 'c', text: "Doesn't matter — savings are optional", correct: false },
    ],
    explanation: "Pay yourself FIRST! Set aside 20% for savings on day 1. Don't wait to see what's left — there's never anything left.",
    xpReward: 40,
  },
  {
    id: 'bq4',
    question: 'Netflix, dining out, and shopping are...',
    options: [
      { id: 'a', text: 'Needs — everyone needs entertainment', correct: false },
      { id: 'b', text: 'Savings — investing in experiences', correct: false },
      { id: 'c', text: 'Wants — keep them under 30%', correct: true },
    ],
    explanation: "Entertainment and lifestyle spending are Wants. Enjoy them, but cap at 30% of your income to stay financially healthy.",
    xpReward: 30,
  },
  {
    id: 'bq5',
    question: "What's the BEST first step with your first salary?",
    options: [
      { id: 'a', text: 'Buy the latest iPhone', correct: false },
      { id: 'b', text: 'Start a SIP of ₹5,000/month', correct: true },
      { id: 'c', text: 'Pay off all debts at once', correct: false },
    ],
    explanation: "Starting a SIP early lets compounding work its magic. Even ₹5,000/month at 22 can grow to ₹1Cr+ by retirement!",
    xpReward: 50,
  },
];

// ===========================
// ===========================
// MODULE 2 STAGE 1: The Sleeping Money (Story)
// ===========================
export const STAGE_4_DIALOGUE = [
  {
    character: 'narrator',
    text: "One month later. Salary credited. Budget sorted. ₹8,000 saved. 🎉",
    mood: 'excited',
    audio: 'success',
    highlight: '₹8,000 saved!',
  },
  {
    character: 'player',
    text: "Boom! Look at me go. I'm basically a financial genius.",
    mood: 'ecstatic',
    audio: 'pop',
  },
  {
    character: 'laxmi',
    text: "Ha! Love the energy. But... where exactly did you put that ₹8,000?",
    mood: 'warm',
    audio: 'mentor',
  },
  {
    character: 'player',
    text: "Uh... it's in my savings account? Safe and cozy.",
    mood: 'confident',
    audio: 'pop',
  },
  {
    character: 'laxmi',
    text: "Safe, yes. But not cozy. Right now, it's just... sleeping.",
    mood: 'dramatic',
    audio: 'mentor',
  },
  {
    character: 'narrator',
    text: "Meanwhile, across town... a shadowy figure smells money.",
    mood: 'suspense',
    audio: 'suspense',
  },
  {
    character: 'iqbal',
    text: "Mwahahaha! I am Inflation Iqbal. And I can smell your sleeping rupees from here. 😈",
    mood: 'villain-entry',
    audio: 'villain',
    highlight: 'Inflation Iqbal appears!',
  },
  {
    character: 'player',
    text: "WHO ARE YOU?! And why do you look so satisfied??",
    mood: 'confused',
    audio: 'error',
  },
  {
    character: 'iqbal',
    text: "Every year, I make everything 6% pricier. That coffee? Up. That rent? Up. Your pizza? Way up.",
    mood: 'villain',
    audio: 'villain',
    highlight: '6% inflation every year',
  },
  {
    character: 'iqbal',
    text: "Your ₹8,000 sitting idle? It can buy LESS next year. I eat it slowly. Nom nom. 😋",
    mood: 'villain',
    audio: 'villain',
  },
  {
    character: 'player',
    text: "That's... horrifying. So saving in a bank is useless?!",
    mood: 'shocked',
    audio: 'error',
  },
  {
    character: 'laxmi',
    text: "Not useless — but not enough! A savings account gives you 3-4%. Iqbal grows at 6%. Do the math.",
    mood: 'dramatic',
    audio: 'mentor',
    highlight: '3-4% vs 6% inflation 😬',
  },
  {
    character: 'iqbal',
    text: "You're LOSING money while feeling safe. Classic rookie move. 🤣",
    mood: 'villain',
    audio: 'villain',
  },
  {
    character: 'player',
    text: "Okay Iqbal, you're officially my nemesis. Laxmi — what do I DO?",
    mood: 'determined',
    audio: 'pop',
  },
  {
    character: 'laxmi',
    text: "You put your money to WORK! Let it grow faster than Iqbal can eat it.",
    mood: 'excited',
    audio: 'mentor',
  },
  {
    character: 'laxmi',
    text: "Welcome to Investing. There are vehicles — from bicycles to rockets. 🚀 Let's explore them!",
    mood: 'warm',
    audio: 'chime',
    highlight: 'Let the investing journey begin!',
  },
  {
    character: 'iqbal',
    text: "Hmph. Fine. But I'll be watching, rookie.",
    mood: 'villain',
    audio: 'villain',
  },
];

// Alias used by Quest.jsx
export const MODULE_2_STAGE_1_DIALOGUE = STAGE_4_DIALOGUE;

// ===========================
// MODULE 2 STAGE 2: The Money Talk (SocraticDialogue Quiz)
// ===========================
export const MODULE_2_STAGE_2_QUEST = [
  {
    speaker: 'laxmi',
    text: "Iqbal eats 6% of your money every year. Your savings account gives 3.5%. What's happening to your ₹8,000?",
    options: [
      { id: 'a', text: 'It is growing safely 🌱', correct: false, feedback: "Not quite! 3.5% growth minus 6% inflation = you're losing purchasing power every year." },
      { id: 'b', text: "It's losing value slowly 📉", correct: true, feedback: "Exactly! Your money can buy LESS each year. That's why investing matters." },
      { id: 'c', text: "It stays the same 🤷", correct: false, feedback: "It stays the same in rupees — but buys less every year. Inflation is sneaky!" },
    ],
    xpReward: 40,
  },
  {
    speaker: 'laxmi',
    text: "You want zero risk and guaranteed returns. Which is your best vehicle?",
    options: [
      { id: 'a', text: 'Index Fund 📈', correct: false, feedback: "Index funds fluctuate with the market. Not zero risk!" },
      { id: 'b', text: 'Fixed Deposit (FD) 🏦', correct: true, feedback: "FDs are bank-guaranteed. Safe as a bicycle — steady but slow at 6–7%." },
      { id: 'c', text: 'Mutual Fund 💼', correct: false, feedback: "Mutual funds carry market risk. Safe-ish, but not guaranteed!" },
    ],
    xpReward: 40,
  },
  {
    speaker: 'iqbal',
    text: "Mwahaha! You put ₹5,000 in an FD at 7%. I inflate at 6%. How much do you ACTUALLY gain?",
    options: [
      { id: 'a', text: '7% — full gain! 💪', correct: false, feedback: "Nope! I eat 6% of it. You only net about 1% real growth. Classic!" },
      { id: 'b', text: "About 1% real gain 😅", correct: true, feedback: "Correct! 7% FD - 6% inflation = ~1% real return. FDs barely beat me." },
      { id: 'c', text: 'You lose money 😱', correct: false, feedback: "Not quite — you gain a tiny bit, but barely. The FD wins by a whisker!" },
    ],
    xpReward: 50,
  },
  {
    speaker: 'laxmi',
    text: "You want to invest ₹500/month automatically without timing the market. What's perfect for you?",
    options: [
      { id: 'a', text: 'Buy stocks manually every month 📊', correct: false, feedback: "Manual stock-picking takes research and timing. Not beginner-friendly!" },
      { id: 'b', text: 'Keep in savings account 🏧', correct: false, feedback: "3.5% won't beat Iqbal's 6% inflation. You need to do better!" },
      { id: 'c', text: 'Start a SIP 🚀', correct: true, feedback: "SIP (Systematic Investment Plan) auto-invests fixed amounts monthly. Set it and forget it!" },
    ],
    xpReward: 50,
  },
];

// ===========================
// MODULE 2 STAGE 2: Learning Cards
// ===========================
export const LEARNING_CARDS_DATA = [
  {
    id: 'lc1',
    title: 'What is Investing?',
    icon: 'trending-up',
    text: 'Making your money grow faster than inflation.',
    xpReward: 20,
  },
  {
    id: 'lc2',
    title: 'Risk vs Return',
    icon: 'scale',
    text: 'Higher risk = higher potential return, lower risk = slower growth.',
    xpReward: 20,
  },
  {
    id: 'lc3',
    title: 'Fixed Deposit',
    icon: 'shield-check',
    text: '6–7% return, bank guaranteed, barely beats inflation (the bicycle).',
    xpReward: 20,
  },
  {
    id: 'lc4',
    title: 'Mutual Funds',
    icon: 'users',
    text: 'Experts pool investor money and invest smarter together (the motorcycle).',
    xpReward: 20,
  },
  {
    id: 'lc5',
    title: 'SIP',
    icon: 'calendar-clock',
    text: '₹500/month, automatic, no market timing needed.',
    xpReward: 20,
  },
  {
    id: 'lc6',
    title: 'Index Funds',
    icon: 'bar-chart',
    text: 'Copies Nifty 50, low cost, beats most experts long term (the self-driving car).',
    xpReward: 20,
  },
  {
    id: 'lc7',
    title: 'Compounding',
    icon: 'layers',
    text: 'Your returns earn returns. Starting at 22 vs 30 makes a massive difference.',
    xpReward: 30,
  },
];

// ===========================
// MODULE 2 STAGE 3: Pick Your Vehicle (Quest)
// ===========================
export const INVESTMENT_QUEST_DATA = [
  {
    id: 'iq1',
    question: "You want your money to be 100% safe. No risk at all.",
    options: [
      { id: 'fd', text: 'Fixed Deposit', correct: true },
      { id: 'mf', text: 'Mutual Fund', correct: false },
      { id: 'if', text: 'Index Fund', correct: false },
    ],
    explanation: "Fixed Deposits offer guaranteed returns. They are the 'bicycle' — very safe, but they barely beat inflation.",
    explainer: 'laxmi',
    xpReward: 50,
  },
  {
    id: 'iq2',
    question: "You want to start investing with just ₹500/month automatically.",
    options: [
      { id: 'fd', text: 'Fixed Deposit', correct: false },
      { id: 'sip', text: 'SIP', correct: true },
      { id: 'sa', text: 'Savings Account', correct: false },
    ],
    explanation: "SIP (Systematic Investment Plan) is perfect for small, regular investments without worrying about market timing.",
    explainer: 'laxmi',
    xpReward: 50,
  },
  {
    id: 'iq3',
    question: "You want long-term growth without picking individual stocks.",
    options: [
      { id: 'fd', text: 'Fixed Deposit', correct: false },
      { id: 'mf', text: 'Mutual Fund', correct: false },
      { id: 'if', text: 'Index Fund', correct: true },
    ],
    explanation: "Index Funds simply copy the market (like Nifty 50). They have low fees and often beat active experts in the long run. The 'self-driving car'!",
    explainer: 'laxmi',
    xpReward: 50,
  },
  {
    id: 'iq4',
    question: "You want experts to manage your money for potentially higher returns.",
    options: [
      { id: 'mf', text: 'Mutual Fund', correct: true },
      { id: 'if', text: 'Index Fund', correct: false },
      { id: 'sip', text: 'SIP', correct: false },
    ],
    explanation: "Mutual funds pool money from many investors, and professional fund managers decide where to invest it.",
    explainer: 'laxmi',
    xpReward: 50,
  },
  {
    id: 'iq5',
    question: "Iqbal says: just keep it in your savings account, it's safe!",
    options: [
      { id: 'sa', text: 'Keep in Savings', correct: false },
      { id: 'inv', text: 'Invest it', correct: true },
    ],
    explanation: "Savings accounts give 3-4%, while I grow at 6%. Your 'safe' money is losing its purchasing power every day! Mwahaha!",
    explainer: 'iqbal',
    xpReward: 50,
  },
];


// ===========================
// MODULE 3 - STAGE 1: The Tax Shield (Story)
// ===========================
export const MODULE_3_STAGE_1_DIALOGUE = [
  { character: 'narrator', text: "Raj is a freelance designer. He just landed a massive ₹25 Lakh contract!", mood: 'excited', audio: 'success' },
  { character: 'raj', text: "I'm rich! I'm going to buy that new laptop!", mood: 'ecstatic', audio: 'pop' },
  { character: 'tanmay', text: "Not so fast. Did you register for GST?", mood: 'villain', audio: 'villain' },
  { character: 'raj', text: "G-S-what? I just draw logos, man.", mood: 'confused', audio: 'error' },
  { character: 'laxmi', text: "GST stands for Goods and Services Tax. Since your turnover exceeds ₹20 Lakhs, it's mandatory.", mood: 'wise', audio: 'mentor' },
  { character: 'tanmay', text: "If you don't charge it, I'll take it from your pocket as a penalty!", mood: 'villain', audio: 'villain' },
  { character: 'player', text: "Wait, so Raj has to pay the tax from his ₹25 Lakhs?", mood: 'curious', audio: 'pop' },
  { character: 'laxmi', text: "No! He adds it to his invoice. The client pays it. Raj just collects it for the government.", mood: 'wise', audio: 'chime' },
  { character: 'raj', text: "Oh! So it's not my money anyway? Phew.", mood: 'happy', audio: 'success' },
];

// ===========================
// MODULE 3 - STAGE 2: GST Mechanics (Cards)
// ===========================
export const MODULE_3_STAGE_2_CARDS = [
  { id: 'cgst-sgst', title: 'Intra-State Sales', description: 'When selling within your state, split the GST into CGST (Central) and SGST (State).', icon: 'split-square-horizontal', color: '#8B5CF6' },
  { id: 'igst', title: 'Inter-State Sales', description: 'When selling across state borders, you charge a single IGST (Integrated GST).', icon: 'globe', color: '#A78BFA' },
  { id: 'itc', title: 'Input Tax Credit', description: 'Bought a laptop for work? The GST you paid on it can be deducted from the GST you owe!', icon: 'piggy-bank', color: '#10B981' },
];

// ===========================
// MODULE 3 - STAGE 3: Tax Quest (Quest)
// ===========================
export const MODULE_3_QUEST = [
  {
    character: 'laxmi',
    text: "Raj sold ₹10,000 worth of designs within his state. GST is 18%. How is it charged?",
    options: [
      { text: '18% IGST', correct: false, response: 'Remember, it is within the same state!' },
      { text: '9% CGST and 9% SGST', correct: true, response: 'Perfect! Intra-state sales are split equally.' },
      { text: '18% CGST', correct: false, response: 'The state needs its share too (SGST).' },
    ],
  },
  {
    character: 'laxmi',
    text: "Raj collected ₹1,800 in GST. But he paid ₹800 GST when buying his design software. What does he pay the government?",
    options: [
      { text: '₹1,800', correct: false, response: 'He can claim Input Tax Credit on his business expenses!' },
      { text: '₹2,600', correct: false, response: 'You subtracted it the wrong way!' },
      { text: '₹1,000', correct: true, response: 'Exactly! ₹1,800 collected - ₹800 Input Tax Credit = ₹1,000 owed.' },
    ],
  },
];

// ===========================
// Stage metadata for skill tree
// ===========================
export const STAGES = [
  {
    id: 'stage-1',
    number: 1,
    title: 'The Story Begins',
    subtitle: 'From offer letter to reality check',
    type: 'story',
    module: 1,
    lucideIcon: 'message-square',
    xpReward: 100,
    color: '#059669',
  },
  {
    id: 'stage-2',
    number: 2,
    title: 'Payslip Detective',
    subtitle: 'Decode every deduction',
    type: 'quest',
    module: 1,
    lucideIcon: 'search',
    xpReward: 200,
    color: '#10B981',
  },
  {
    id: 'stage-3',
    number: 3,
    title: 'Budget Battle',
    subtitle: 'Master the 50/30/20 rule',
    type: 'quiz',
    module: 1,
    lucideIcon: 'pie-chart',
    xpReward: 190,
    color: '#00E676',
  },
  {
    id: 'stage-4',
    number: 1,
    title: 'The Sleeping Money',
    subtitle: 'Inflation Iqbal arrives',
    type: 'story',
    module: 2,
    lucideIcon: 'message-square',
    xpReward: 100,
    color: '#3B82F6',
  },
  {
    id: 'stage-5',
    number: 2,
    title: 'Investment 101',
    subtitle: 'Learn the vehicles',
    type: 'cards',
    module: 2,
    lucideIcon: 'book-open',
    xpReward: 150,
    color: '#00D4FF',
  },
  {
    id: 'stage-6',
    number: 3,
    title: 'Pick Your Vehicle',
    subtitle: 'Beat Inflation Iqbal',
    type: 'quest',
    module: 2,
    lucideIcon: 'trending-up',
    xpReward: 250,
    color: '#00E676',
  },
  {
    id: 'stage-7',
    number: 1,
    title: 'The Tax Shield',
    subtitle: 'Laxmi explains GST',
    type: 'story',
    module: 3,
    lucideIcon: 'shield-check',
    xpReward: 100,
    color: '#8B5CF6',
  },
  {
    id: 'stage-8',
    number: 2,
    title: 'GST Mechanics',
    subtitle: 'CGST, SGST, IGST & ITC',
    type: 'learn',
    module: 3,
    lucideIcon: 'file-text',
    xpReward: 150,
    color: '#A78BFA',
  },
  {
    id: 'stage-9',
    number: 3,
    title: 'Tax Quest',
    subtitle: 'Help Raj calculate his GST',
    type: 'quest',
    module: 3,
    lucideIcon: 'calculator',
    xpReward: 300,
    color: '#7C3AED',
  },
];

// CTC Breakdown data — kept for payslip view
export const CTC_COMPONENTS = [
  { id: 'basic', name: 'Basic Salary', monthlyAmount: 26667, annualAmount: 320000, type: 'earning', lucideIcon: 'banknote', description: 'Core salary — 40% of CTC. Base for HRA & EPF calculations.' },
  { id: 'hra', name: 'HRA', monthlyAmount: 10667, annualAmount: 128000, type: 'earning', lucideIcon: 'home', description: 'House Rent Allowance — save tax if you pay rent!' },
  { id: 'special', name: 'Special Allowance', monthlyAmount: 10000, annualAmount: 120000, type: 'earning', lucideIcon: 'sparkles', description: 'Flexible catch-all. Fully taxable.' },
  { id: 'epf', name: 'EPF (You)', monthlyAmount: 3200, annualAmount: 38400, type: 'deduction', lucideIcon: 'lock', description: '12% of basic — YOUR retirement savings.' },
  { id: 'ptax', name: 'Prof. Tax', monthlyAmount: 200, annualAmount: 2400, type: 'deduction', lucideIcon: 'file-text', description: 'State tax — capped at ₹2,500/year.' },
  { id: 'tds', name: 'TDS', monthlyAmount: 3733, annualAmount: 44800, type: 'deduction', lucideIcon: 'landmark', description: 'Income tax deducted upfront by employer.' },
];


// Audio map — keys match the `audio` field on dialogue lines
export const AUDIO_MAP = {
  whoosh: { frequency: 300, duration: 0.15, type: 'sine', ramp: true },
  success: { frequency: 523, duration: 0.2, type: 'sine', secondFreq: 659 },
  pop: { frequency: 600, duration: 0.1, type: 'sine' },
  chime: { frequency: 800, duration: 0.25, type: 'sine', secondFreq: 1000 },
  suspense: { frequency: 200, duration: 0.3, type: 'triangle' },
  notification: { frequency: 880, duration: 0.12, type: 'sine', secondFreq: 1100 },
  error: { frequency: 200, duration: 0.2, type: 'square' },
  villain: { frequency: 150, duration: 0.3, type: 'sawtooth' },
  mentor: { frequency: 660, duration: 0.2, type: 'sine', secondFreq: 880 },
  correct: { frequency: 523, duration: 0.15, type: 'sine', secondFreq: 784 },
  wrong: { frequency: 200, duration: 0.25, type: 'square', secondFreq: 150 },
  xpPop: { frequency: 1000, duration: 0.1, type: 'sine' },
  badgeUnlock: { frequency: 523, duration: 0.3, type: 'sine', secondFreq: 784, thirdFreq: 1047 },
};
