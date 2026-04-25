import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import Landing from './pages/Landing';
import Quest from './pages/Quest';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="grid-overlay" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
