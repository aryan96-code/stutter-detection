import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Home from './components/Home';
import LiveMonitoring from './components/LiveMonitoring';
import Reports from './components/Reports';
import TrainingMode from './components/TrainingMode';
import Comparison from './components/Comparison';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Stutter Detection System';
      case '/monitor': return 'Live Monitoring';
      case '/reports': return 'Session Reports';
      case '/training': return 'Training Mode';
      case '/comparison': return 'Progress Comparison';
      default: return '';
    }
  };

  const showBackButton = location.pathname !== '/';

  return (
    <div className="app-container">
      <nav className="navbar">
        {showBackButton && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="navbar-title">{getPageTitle(location.pathname)}</h1>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monitor" element={<LiveMonitoring />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/training" element={<TrainingMode />} />
        <Route path="/comparison" element={<Comparison />} />
      </Routes>
    </div>
  );
}

export default App;
