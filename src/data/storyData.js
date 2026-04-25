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
    role: 'The Silent Thief',
    avatar: '/characters/iqbal.png',
    lucideIcon: 'flame',
    color: '#F97316',
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
// MODULE 2: The Investor
// ===========================

export const MODULE_2_STAGE_1_DIALOGUE = [
  {
    character: 'narrator',
    text: "Evening. You're looking at your bank balance. ₹8,000 saved this month.",
    mood: 'warm',
    audio: 'whoosh',
  },
  {
    character: 'player',
    text: "Wow, I actually saved money! Let's just leave it in the bank.",
    mood: 'ecstatic',
    audio: 'pop',
  },
  {
    character: 'iqbal',
    text: "Ah, sleeping money. My favorite kind. So easy to steal.",
    mood: 'villain-entry',
    audio: 'villain',
  },
  {
    character: 'laxmi',
    text: "Stop right there, Iqbal! Leaving money idle is how inflation eats it.",
    mood: 'dramatic',
    audio: 'mentor',
  },
  {
    character: 'iqbal',
    text: "I'm Inflation Iqbal. I make your ₹8,000 worth less every single year.",
    mood: 'villain-entry',
    audio: 'suspense',
  },
  {
    character: 'laxmi',
    text: "Not on my watch. Let's talk about the vehicles of wealth creation.",
    mood: 'warm',
    audio: 'chime',
  },
];

export const MODULE_2_STAGE_2_QUEST = [
  {
    id: 'm2_q1',
    speaker: 'laxmi',
    text: "What do you do with your ₹8,000 savings?",
    options: [
      { id: 'a', text: 'Keep it in a savings account safely', correct: false, feedback: "A savings account gives ~3%. Inflation is ~6%. You are losing money!" },
      { id: 'b', text: 'Invest it to beat inflation', correct: true, feedback: "Exactly! Your money needs to work harder than Iqbal works." },
    ],
    xpReward: 30,
  },
  {
    id: 'm2_q2',
    speaker: 'laxmi',
    text: "To get higher returns, you have to take some risk. What would you pick?",
    options: [
      { id: 'a', text: '6% guaranteed return (Zero risk)', correct: false, feedback: "Zero risk means zero real growth after inflation. You need to take calculated risks." },
      { id: 'b', text: '12% return with short-term ups and downs', correct: true, feedback: "Yes! In the long run, the stock market trends upwards." },
    ],
    xpReward: 30,
  },
  {
    id: 'm2_q3',
    speaker: 'iqbal',
    text: "Just put it in a Fixed Deposit (FD) like your parents do! It's safe!",
    options: [
      { id: 'a', text: 'FDs are great for everything', correct: false, feedback: "FDs are good for emergencies, but they barely beat me (inflation)!" },
      { id: 'b', text: 'FDs are for emergencies, not wealth creation', correct: true, feedback: "Smart kid. You can't get rich on 6% before taxes." },
    ],
    xpReward: 40,
  },
  {
    id: 'm2_q4',
    speaker: 'laxmi',
    text: "Imagine 1,000 people pool their money and hire an expert to invest it. What is that?",
    options: [
      { id: 'a', text: 'A Mutual Fund', correct: true, feedback: "Spot on! The expert manages the risk for you." },
      { id: 'b', text: 'A Ponzi Scheme', correct: false, feedback: "No! Mutual Funds are regulated by SEBI." },
    ],
    xpReward: 30,
  },
  {
    id: 'm2_q5',
    speaker: 'laxmi',
    text: "Scared of picking the 'wrong month' to invest? What's the fix?",
    options: [
      { id: 'a', text: 'Wait for the perfect market crash', correct: false, feedback: "Time in the market beats timing the market!" },
      { id: 'b', text: 'Start a SIP (Systematic Investment Plan)', correct: true, feedback: "Yes! Automate your investments every month regardless of market highs or lows." },
    ],
    xpReward: 50,
  },
  {
    id: 'm2_q6',
    speaker: 'laxmi',
    text: "Don't know which companies to pick? You can just buy a tiny piece of India's top 50 companies.",
    options: [
      { id: 'a', text: 'That sounds like an Index Fund (Nifty 50)', correct: true, feedback: "Exactly. You are betting on India's growth." },
      { id: 'b', text: 'I will pick random stocks instead', correct: false, feedback: "Stock picking is risky. Index funds are a safer bet." },
    ],
    xpReward: 40,
  },
  {
    id: 'm2_q7',
    speaker: 'laxmi',
    text: "Arjun starts investing ₹5,000/mo at 22. Priya starts at 30. Who wins at age 50?",
    options: [
      { id: 'a', text: 'Priya, because she earns more later', correct: false, feedback: "Wrong! Compounding needs TIME. Arjun will have significantly more." },
      { id: 'b', text: 'Arjun, because compounding works magic over time', correct: true, feedback: "Yes! The earlier you start, the less you have to save overall." },
    ],
    xpReward: 60,
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
    subtitle: 'Meet Inflation Iqbal',
    type: 'story',
    module: 2,
    lucideIcon: 'message-square',
    xpReward: 100,
    color: '#3B82F6',
  },
  {
    id: 'stage-5',
    number: 2,
    title: 'The Money Talk',
    subtitle: 'Socratic dialogue on investing',
    type: 'quest',
    module: 2,
    lucideIcon: 'message-circle-question',
    xpReward: 280,
    color: '#60A5FA',
  },
  {
    id: 'stage-6',
    number: 3,
    title: 'Build Your Portfolio',
    subtitle: 'Allocate your ₹8,000 savings',
    type: 'minigame',
    module: 2,
    lucideIcon: 'trending-up',
    xpReward: 250,
    color: '#2563EB',
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
