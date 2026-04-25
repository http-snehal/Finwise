// =========================================
// WealthQuest — Story Script Data
// The entire narrative is driven from here.
// =========================================

export const CHARACTERS = {
  tanmay: {
    id: 'tanmay',
    name: 'Tax-Man Tanmay',
    role: 'The Charming Villain',
    avatar: '/characters/tanmay.png',
    fallbackEmoji: '🕴️',
    color: '#FF4757',
    tagline: 'I take your money... legally.',
  },
  laxmi: {
    id: 'laxmi',
    name: 'Laxmi',
    role: 'The Wise Mentor',
    avatar: '/characters/laxmi.png',
    fallbackEmoji: '🪷',
    color: '#FFB800',
    tagline: 'Every rupee saved is a rupee earned.',
  },
  narrator: {
    id: 'narrator',
    name: 'Narrator',
    role: 'Story Guide',
    avatar: null,
    fallbackEmoji: '📖',
    color: '#00D4FF',
    tagline: '',
  },
  hr: {
    id: 'hr',
    name: 'HR Manager',
    role: 'The Offer Bearer',
    avatar: null,
    fallbackEmoji: '👔',
    color: '#3B82F6',
    tagline: 'Welcome aboard!',
  },
  player: {
    id: 'player',
    name: 'You',
    role: 'The First Jobber',
    avatar: null,
    fallbackEmoji: '🎮',
    color: '#00E676',
    tagline: '',
  },
};

// Scene 1: The Interview Room
export const SCENE_INTERVIEW = [
  {
    character: 'narrator',
    text: "Three months ago, you aced the final round of interviews at TechNova Solutions. Today, the email you've been waiting for finally arrives...",
    mood: 'dramatic',
  },
  {
    character: 'hr',
    text: "Congratulations! 🎉 We're thrilled to offer you the position of Software Developer at TechNova Solutions!",
    mood: 'excited',
  },
  {
    character: 'hr',
    text: "Your CTC package is ₹8,00,000 per annum. That's 8 Lakhs Per Annum! Welcome to the team! 🥳",
    mood: 'excited',
    highlight: '₹8,00,000',
  },
  {
    character: 'player',
    text: "₹8 LAKHS?! That's... that's amazing! I can't believe it! Wait till I tell mom and dad! 🤩",
    mood: 'ecstatic',
  },
  {
    character: 'narrator',
    text: "You sign the offer letter with trembling hands. Instagram story posted. Family group chat exploding. Life is good.",
    mood: 'warm',
  },
  {
    character: 'narrator',
    text: "Fast forward 30 days. Your first month at work flies by. Coffee runs, standup meetings, imposter syndrome — the usual. And then...",
    mood: 'transition',
  },
  {
    character: 'narrator',
    text: "💰 SALARY DAY arrives. You refresh your bank app every 5 minutes starting 9 AM...",
    mood: 'suspense',
  },
];

// Scene 2: The Rude Awakening
export const SCENE_PAYSLIP = [
  {
    character: 'narrator',
    text: "3:47 PM. A notification pings. You nearly drop your phone.",
    mood: 'suspense',
  },
  {
    character: 'narrator',
    text: "Bank SMS: 'Credited: ₹52,000 from TechNova Solutions Pvt Ltd'",
    mood: 'reveal',
    highlight: '₹52,000',
    isNotification: true,
  },
  {
    character: 'player',
    text: "Wait... ₹52,000? But I was promised 8 lakhs! That's ₹66,667 per month! WHERE DID ₹14,667 GO?! 😰",
    mood: 'confused',
  },
  {
    character: 'player',
    text: "Did... did they make a mistake? Should I email HR? Is this even legal?!",
    mood: 'anxious',
  },
  {
    character: 'tanmay',
    text: "Hahahaha! No mistake, my friend. Allow me to introduce myself... I'm Tanmay. Tax-Man Tanmay. 😏",
    mood: 'villain-entry',
  },
  {
    character: 'tanmay',
    text: "That ₹14,667 you're missing? Some of it came to me. Some went to your future self. Some... well, let's just say the government sends its regards. 💀",
    mood: 'mischievous',
  },
  {
    character: 'laxmi',
    text: "Don't let him scare you, dear. I'm Laxmi, and I'm here to make sure you understand exactly where every rupee went. 🪷",
    mood: 'warm',
  },
  {
    character: 'laxmi',
    text: "Let's decode your payslip together. By the end, you'll know more about your salary than 90% of working adults in India. Ready?",
    mood: 'encouraging',
  },
];

// Scene 3: CTC Breakdown dialogue
export const SCENE_CTC_INTRO = [
  {
    character: 'laxmi',
    text: "First things first — that ₹8,00,000 is your CTC. Cost To Company. It's what the COMPANY spends on you, not what YOU receive.",
    mood: 'teaching',
  },
  {
    character: 'tanmay',
    text: "Think of it like an MRP on a product. Nobody actually pays MRP, right? 😄",
    mood: 'witty',
  },
  {
    character: 'laxmi',
    text: "Your CTC gets split into several components. Let's discover each one — tap on each deduction card to reveal what it means!",
    mood: 'encouraging',
  },
];

// After CTC breakdown interactive
export const SCENE_CTC_OUTRO = [
  {
    character: 'laxmi',
    text: "See? Every deduction has a purpose. EPF is YOUR money saved for retirement. TDS is income tax paid in advance.",
    mood: 'teaching',
  },
  {
    character: 'tanmay',
    text: "And Professional Tax? That's my favourite. ₹200 per month, just for the privilege of having a profession. You're welcome! 😈",
    mood: 'mischievous',
  },
  {
    character: 'laxmi',
    text: "The key insight: CTC ≠ In-Hand Salary. Your ₹8 LPA CTC gives you ₹52,000 in-hand. And that's completely normal!",
    mood: 'reassuring',
  },
  {
    character: 'laxmi',
    text: "Now that you understand your payslip, let's learn to use your ₹52,000 wisely. Time for the Budget Quest! 🎯",
    mood: 'excited',
  },
];

// Scene 4: Budget Mini-Game dialogue
export const SCENE_BUDGET_INTRO = [
  {
    character: 'laxmi',
    text: "Here's a golden rule of personal finance — the 50/30/20 rule. It's simple but powerful! ✨",
    mood: 'teaching',
  },
  {
    character: 'laxmi',
    text: "50% for NEEDS (rent, food, transport), 30% for WANTS (entertainment, shopping, dining out), and 20% for SAVINGS & INVESTMENTS.",
    mood: 'teaching',
  },
  {
    character: 'tanmay',
    text: "Boring! Just spend it all on Zomato orders and sneakers! ...I'm kidding. Even I save. Don't tell anyone. 😅",
    mood: 'comic-relief',
  },
  {
    character: 'laxmi',
    text: "Let's put this into practice. You have ₹52,000. Allocate it across categories. I'll tell you how you did! Drag the sliders to set your budget. 👇",
    mood: 'encouraging',
  },
];

export const SCENE_BUDGET_OUTRO_GOOD = [
  {
    character: 'laxmi',
    text: "Excellent work! 🌟 Your allocation follows the 50/30/20 rule beautifully. Your future self will thank you!",
    mood: 'proud',
  },
  {
    character: 'tanmay',
    text: "Hmph. Saving money means less TDS for me in the future. But... fine, well done. I suppose. 😤",
    mood: 'reluctant-praise',
  },
];

export const SCENE_BUDGET_OUTRO_BAD = [
  {
    character: 'laxmi',
    text: "Not quite right, but that's okay! Most people get this wrong their first time. Let's look at what a balanced budget looks like.",
    mood: 'gentle',
  },
  {
    character: 'tanmay',
    text: "If you keep spending like this, you'll definitely see more of me during tax season. Just saying! 😏",
    mood: 'teasing',
  },
];

// Finale
export const SCENE_FINALE = [
  {
    character: 'narrator',
    text: "🏆 QUEST COMPLETE! You've successfully decoded your first payslip and learned to budget like a pro!",
    mood: 'celebration',
  },
  {
    character: 'laxmi',
    text: "You did it! In just 10 minutes, you learned what takes most people years to figure out. I'm proud of you! 🪷",
    mood: 'proud',
  },
  {
    character: 'tanmay',
    text: "Fine, fine. You've earned the 'Payslip Pro' badge. But don't get cocky — Module 2 covers Section 80C, and that's where things get REALLY interesting. 😈",
    mood: 'respectful-villain',
  },
  {
    character: 'narrator',
    text: "Badge Unlocked: 🏆 Payslip Pro — You understood your CTC, decoded deductions, and budgeted your first salary!",
    mood: 'achievement',
  },
];

// CTC Breakdown data
export const CTC_COMPONENTS = [
  {
    id: 'basic',
    name: 'Basic Salary',
    monthlyAmount: 26667,
    annualAmount: 320000,
    type: 'earning',
    description: 'The core of your salary. Usually 40% of CTC. This is the baseline for calculating other components like HRA and EPF.',
    icon: '💵',
    revealText: 'The foundation stone! Everything else is calculated from this number.',
  },
  {
    id: 'hra',
    name: 'HRA (House Rent Allowance)',
    monthlyAmount: 10667,
    annualAmount: 128000,
    type: 'earning',
    description: 'Meant for your rent. Usually 40-50% of basic. Pro tip: If you pay rent, this can save you tax under Section 10(13A)!',
    icon: '🏠',
    revealText: 'This helps you with rent AND can save taxes — if you know the trick!',
  },
  {
    id: 'special',
    name: 'Special Allowance',
    monthlyAmount: 10000,
    annualAmount: 120000,
    type: 'earning',
    description: 'A flexible component companies use to balance your CTC. Fully taxable, but it bumps up your in-hand salary.',
    icon: '✨',
    revealText: 'The "catch-all" allowance. Fully taxable, but it goes straight to your bank!',
  },
  {
    id: 'epf-employee',
    name: 'EPF (Your Contribution)',
    monthlyAmount: 3200,
    annualAmount: 38400,
    type: 'deduction',
    description: '12% of your Basic goes to your Employee Provident Fund. It\'s YOUR money, locked away for retirement. You can\'t touch it easily, but it grows with interest!',
    icon: '🔒',
    revealText: 'This is YOUR piggy bank for the future. Forced saving — and it earns ~8.15% interest!',
  },
  {
    id: 'epf-employer',
    name: 'EPF (Employer Contribution)',
    monthlyAmount: 3200,
    annualAmount: 38400,
    type: 'employer-cost',
    description: 'Your company matches your EPF contribution! Another 12% of Basic goes into your PF account. FREE money from your employer!',
    icon: '🏦',
    revealText: 'FREE money! Your employer puts this in — you never see it in-hand, but it\'s yours.',
  },
  {
    id: 'professional-tax',
    name: 'Professional Tax',
    monthlyAmount: 200,
    annualAmount: 2400,
    type: 'deduction',
    description: 'A state-level tax on professionals. Capped at ₹2,500/year in most states. Small but annoying — ask Tanmay about it!',
    icon: '📋',
    revealText: 'The smallest deduction, but the most annoying. Thanks, state government!',
  },
  {
    id: 'tds',
    name: 'TDS (Tax Deducted at Source)',
    monthlyAmount: 3733,
    annualAmount: 44800,
    type: 'deduction',
    description: 'Income tax collected in advance by your employer. Based on your projected annual income and tax slab. You can reduce this with 80C investments!',
    icon: '🏛️',
    revealText: 'Tanmay\'s favourite! Tax collected upfront. But you can legally reduce this...',
  },
  {
    id: 'gratuity',
    name: 'Gratuity',
    monthlyAmount: 1282,
    annualAmount: 15385,
    type: 'employer-cost',
    description: 'A retirement benefit if you stay 5+ years. Part of your CTC but you won\'t see it for a long time. It\'s the company\'s "thank you" for loyalty!',
    icon: '🎁',
    revealText: 'The loyalty bonus! Stay 5 years, and this becomes yours.',
  },
  {
    id: 'insurance',
    name: 'Health Insurance',
    monthlyAmount: 1016,
    annualAmount: 12195,
    type: 'employer-cost',
    description: 'Group health insurance provided by your company. Covers you (and sometimes family) for medical expenses. Part of CTC but a genuine benefit!',
    icon: '🏥',
    revealText: 'Your safety net! Company-sponsored health coverage.',
  },
];

// Quiz questions for CTC module
export const CTC_QUIZ = [
  {
    id: 'q1',
    question: 'Your CTC is ₹8 LPA but you receive ₹52,000/month. Why?',
    options: [
      { id: 'a', text: 'The company is cheating you', correct: false },
      { id: 'b', text: 'CTC includes employer costs & deductions that don\'t reach your bank', correct: true },
      { id: 'c', text: 'There\'s been a bank error', correct: false },
      { id: 'd', text: 'You need to ask HR to fix it', correct: false },
    ],
    explanation: 'CTC = Cost to Company. It includes YOUR salary + employer contributions (EPF, gratuity, insurance) + tax deductions. The in-hand amount is always less than CTC ÷ 12.',
    xpReward: 50,
  },
  {
    id: 'q2',
    question: 'What happens to your EPF (Employee Provident Fund) contribution?',
    options: [
      { id: 'a', text: 'The government takes it as tax', correct: false },
      { id: 'b', text: 'It\'s gone forever', correct: false },
      { id: 'c', text: 'It\'s saved in YOUR retirement account, earning ~8% interest', correct: true },
      { id: 'd', text: 'Your company keeps it as profit', correct: false },
    ],
    explanation: 'EPF is YOUR money! Both you and your employer contribute 12% of basic salary. It earns ~8.15% interest and you can withdraw it when you retire or change jobs.',
    xpReward: 50,
  },
  {
    id: 'q3',
    question: 'TDS is deducted from your salary. What does TDS stand for?',
    options: [
      { id: 'a', text: 'Total Deduction Summary', correct: false },
      { id: 'b', text: 'Tax Deducted at Source', correct: true },
      { id: 'c', text: 'Temporary Deduction System', correct: false },
      { id: 'd', text: 'Tax Due on Salary', correct: false },
    ],
    explanation: 'TDS = Tax Deducted at Source. Your employer estimates your annual tax liability and deducts it monthly BEFORE paying you. You can reduce TDS by investing in 80C instruments!',
    xpReward: 50,
  },
];
