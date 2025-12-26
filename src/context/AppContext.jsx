import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('wallet');
    return saved ? JSON.parse(saved) : { balance: 1000, history: [] };
  });
  const [user, setUser] = useState({
    name: 'Pro Gamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky',
    level: 5,
    xp: 2450
  });
  const [activeGame, setActiveGame] = useState(null);
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'First Win', description: 'Win your first game', icon: '🏆', unlocked: false },
      { id: 2, title: 'Big Spender', description: 'Spend 500 coins', icon: '💰', unlocked: false },
      { id: 3, title: 'Game Master', description: 'Play 10 games', icon: '🎮', unlocked: false }
    ];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const updateBalance = (amount, description) => {
    setWallet(prev => ({
      balance: prev.balance + amount,
      history: [{
        id: Date.now(),
        amount,
        description,
        timestamp: new Date().toISOString()
      }, ...prev.history].slice(0, 50)
    }));
  };

  const unlockAchievement = (id) => {
    setAchievements(prev => prev.map(a => 
      a.id === id ? { ...a, unlocked: true } : a
    ));
  };

  return (
    <AppContext.Provider value={{
      theme, setTheme,
      wallet, updateBalance,
      user, setUser,
      activeGame, setActiveGame,
      achievements, unlockAchievement
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
