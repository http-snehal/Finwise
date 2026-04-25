import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import Landing from './pages/Landing';
import Quest from './pages/Quest';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="grid-overlay" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quest" element={<Quest />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
