import { createContext, useContext, useReducer, useCallback } from 'react';

const GameContext = createContext(null);

const initialState = {
  // Player stats
  xp: 0,
  hearts: 3,
  maxHearts: 3,
  streak: 1,
  longestStreak: 1,
  
  // Progress
  currentScene: 0,
  currentModule: 'payslip-101',
  currentModule: 'payslip-101',
  completedScenes: [],
  completedQuests: [],
  completedStages: [],
  activeStageByModule: { 1: 0, 2: 0 },
  
  // Badges
  badges: [],
  
  // User info
  user: JSON.parse(localStorage.getItem('finwise_user')) || null,
  playerName: JSON.parse(localStorage.getItem('finwise_user'))?.username || 'Explorer',
  ctcAmount: 800000,
  
  // Salary breakdown (calculated)
  salaryBreakdown: {
    ctc: 800000,
    basicMonthly: 26667,
    hraMonthly: 10667,
    specialAllowanceMonthly: 10000,
    epfEmployee: 3200,
    epfEmployer: 3200,
    professionalTax: 200,
    tdsMonthly: 3733,
    inHand: 52000,
    grossMonthly: 66667,
  },
  
  // Budget allocation (for mini-game)
  budgetAllocations: {
    rent: 0,
    food: 0,
    transport: 0,
    savings: 0,
    entertainment: 0,
    emi: 0,
  },
  
  // Quiz tracking
  quizAnswers: {},
  
  // UI state
  showBadgeUnlock: false,
  lastBadgeEarned: null,
  xpPopup: null,
};

const BADGE_DEFINITIONS = {
  'payslip-pro': {
    id: 'payslip-pro',
    name: 'Payslip Pro',
    description: 'Decoded your first CTC breakdown',
    lucideIcon: 'file-check',
    xpReward: 200,
  },
  'tax-shield': {
    id: 'tax-shield',
    name: 'Tax Shield Unlocked',
    description: 'Understood TDS and learned to save on taxes',
    lucideIcon: 'shield-check',
    xpReward: 150,
  },
  'budget-master': {
    id: 'budget-master',
    name: 'Budget Master',
    description: 'Successfully allocated salary using the 50/30/20 rule',
    lucideIcon: 'wallet',
    xpReward: 250,
  },
  'first-quest': {
    id: 'first-quest',
    name: 'Quest Beginner',
    description: 'Completed your first quest in WealthQuest',
    lucideIcon: 'swords',
    xpReward: 100,
  },
  'streak-starter': {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Started your first learning streak',
    lucideIcon: 'flame',
    xpReward: 50,
  },
  'gst-guardian': {
    id: 'gst-guardian',
    name: 'GST Guardian',
    description: 'Mastered the mechanics of GST',
    lucideIcon: 'shield',
    xpReward: 300,
  },
  'first-investor': {
    id: 'first-investor',
    name: 'First Investor',
    description: 'Completed the Investor module and built your first portfolio',
    lucideIcon: 'trending-up',
    xpReward: 300,
  },
  'inflation-slayer': {
    id: 'inflation-slayer',
    name: 'Inflation Slayer',
    description: 'Defeated Inflation Iqbal by choosing the right investments',
    lucideIcon: 'shield',
    xpReward: 300,
  },
  'tax-shield': {
    id: 'tax-shield',
    name: 'Tax Shield Master',
    description: 'Mastered GST and Input Tax Credit concepts',
    lucideIcon: 'shield-check',
    xpReward: 400,
  },
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      localStorage.setItem('finwise_user', JSON.stringify({ token: action.payload.token, ...action.payload.user }));
      return {
        ...state,
        user: { token: action.payload.token, ...action.payload.user },
        xp: action.payload.user.xp || 0,
        badges: action.payload.user.badges || [],
        playerName: action.payload.user.username || 'Explorer',
        completedStages: action.payload.user.completedStages || [],
        activeStageByModule: action.payload.user.activeStageByModule || { 1: 0, 2: 0 },
      };
    }
    case 'LOGOUT': {
      localStorage.removeItem('finwise_user');
      return {
        ...state,
        user: null,
        xp: 0,
        badges: [],
        playerName: 'Explorer',
        completedStages: [],
        activeStageByModule: { 1: 0, 2: 0 },
      };
    }
    case 'ADD_XP': {
      const newXp = state.xp + action.payload;
      return {
        ...state,
        xp: newXp,
        xpPopup: { amount: action.payload, id: Date.now() },
      };
    }
    
    case 'LOSE_HEART': {
      return {
        ...state,
        hearts: Math.max(0, state.hearts - 1),
      };
    }
    
    case 'RESTORE_HEART': {
      return {
        ...state,
        hearts: Math.min(state.maxHearts, state.hearts + 1),
      };
    }
    
    case 'ADVANCE_SCENE': {
      const nextScene = state.currentScene + 1;
      return {
        ...state,
        currentScene: nextScene,
        completedScenes: [...new Set([...state.completedScenes, state.currentScene])],
      };
    }
    
    case 'SET_SCENE': {
      return {
        ...state,
        currentScene: action.payload,
      };
    }
    
    case 'COMPLETE_QUEST': {
      return {
        ...state,
        completedQuests: [...new Set([...state.completedQuests, action.payload])],
      };
    }
    
    case 'COMPLETE_STAGE': {
      const { stageId, mod, localIdx, moduleStagesCount } = action.payload;
      const newCompleted = [...new Set([...state.completedStages, stageId])];
      
      const currentActive = state.activeStageByModule[mod] ?? 0;
      const newActive = currentActive === localIdx ? Math.min(currentActive + 1, moduleStagesCount) : currentActive;
      
      return {
        ...state,
        completedStages: newCompleted,
        activeStageByModule: {
          ...state.activeStageByModule,
          [mod]: newActive
        }
      };
    }

    case 'EARN_BADGE': {
      const badge = BADGE_DEFINITIONS[action.payload];
      if (!badge || state.badges.find(b => b.id === badge.id)) return state;
      return {
        ...state,
        badges: [...state.badges, { ...badge, earnedAt: new Date().toISOString() }],
        xp: state.xp + badge.xpReward,
        showBadgeUnlock: true,
        lastBadgeEarned: badge,
        xpPopup: { amount: badge.xpReward, id: Date.now() },
      };
    }
    
    case 'DISMISS_BADGE': {
      return {
        ...state,
        showBadgeUnlock: false,
      };
    }
    
    case 'SET_PLAYER_NAME': {
      return {
        ...state,
        playerName: action.payload,
      };
    }
    
    case 'SET_BUDGET': {
      return {
        ...state,
        budgetAllocations: {
          ...state.budgetAllocations,
          [action.payload.category]: action.payload.amount,
        },
      };
    }
    
    case 'ANSWER_QUIZ': {
      return {
        ...state,
        quizAnswers: {
          ...state.quizAnswers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    }
    
    case 'CLEAR_XP_POPUP': {
      return {
        ...state,
        xpPopup: null,
      };
    }
    
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  const login = useCallback((token, user) => {
    dispatch({ type: 'LOGIN', payload: { token, user } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const syncToBackend = useCallback(async (updates) => {
    if (!state.user?.token) return;
    try {
      await fetch('/api/user/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.user.token}`
        },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.error('Failed to sync progress', err);
    }
  }, [state.user]);

  const addXp = useCallback((amount) => {
    dispatch({ type: 'ADD_XP', payload: amount });
    syncToBackend({ xp: state.xp + amount });
  }, [state.xp, syncToBackend]);
  
  const loseHeart = useCallback(() => {
    dispatch({ type: 'LOSE_HEART' });
  }, []);
  
  const advanceScene = useCallback(() => {
    dispatch({ type: 'ADVANCE_SCENE' });
  }, []);
  
  const setScene = useCallback((scene) => {
    dispatch({ type: 'SET_SCENE', payload: scene });
  }, []);
  
  const earnBadge = useCallback((badgeId) => {
    const badge = BADGE_DEFINITIONS[badgeId];
    if (badge && !state.badges.find(b => b.id === badgeId)) {
      dispatch({ type: 'EARN_BADGE', payload: badgeId });
      syncToBackend({ 
        badges: [...state.badges, { ...badge, earnedAt: new Date().toISOString() }],
        xp: state.xp + badge.xpReward 
      });
    }
  }, [state.badges, state.xp, syncToBackend]);
  
  const dismissBadge = useCallback(() => {
    dispatch({ type: 'DISMISS_BADGE' });
  }, []);
  
  const setPlayerName = useCallback((name) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: name });
  }, []);
  
  const setBudget = useCallback((category, amount) => {
    dispatch({ type: 'SET_BUDGET', payload: { category, amount } });
  }, []);
  
  const answerQuiz = useCallback((questionId, answer) => {
    dispatch({ type: 'ANSWER_QUIZ', payload: { questionId, answer } });
  }, []);
  
  const clearXpPopup = useCallback(() => {
    dispatch({ type: 'CLEAR_XP_POPUP' });
  }, []);
  
  const completeQuest = useCallback((questId) => {
    dispatch({ type: 'COMPLETE_QUEST', payload: questId });
  }, []);
  
  const completeStage = useCallback((payload) => {
    dispatch({ type: 'COMPLETE_STAGE', payload });
  }, []);
  
  const value = {
    ...state,
    login,
    logout,
    addXp,
    loseHeart,
    advanceScene,
    setScene,
    earnBadge,
    dismissBadge,
    setPlayerName,
    setBudget,
    answerQuiz,
    clearXpPopup,
    completeQuest,
    completeStage,
    syncToBackend,
    BADGE_DEFINITIONS,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export default GameContext;
