import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Wallet from './pages/Wallet';
import Rewards from './pages/Rewards';
import Chatbot from './components/Chatbot';
import GameRunner from './components/GameRunner';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { activeGame } = useAppContext();

  if (activeGame) {
    return <GameRunner />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
      {activeTab === 'games' && <Games />}
      {activeTab === 'wallet' && <Wallet />}
      {activeTab === 'rewards' && <Rewards />}
      <Chatbot />
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
