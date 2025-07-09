import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Page components
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import AiPage from './pages/AiPage'; 
import SimulationPage from './pages/SimulationPage';
import PasswordPractice from './pages/PasswordPractice';
import SocialMediaPractice from './pages/SocialMediaPractice';
import ScamEmailPractice from './pages/ScamEmailPractice';
import TextTrapPractice from './pages/TextTrapPractice';
import CaseDetail from './pages/CaseDetail';

function App() {
  return (
    // Main app container with gradient background/ min-h-screen takes at least the full viewport height
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200">
      {/* Global navigation bar */}
      <Navbar />
      
      {/* Application routes */}
      <Routes>
        {/* Redirect root path to home */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Home page */}
        <Route path="/home" element={<HomePage />} />

        {/* Video courses - defaults to first lesson */}
        <Route path="/video" element={<Navigate to="/video/1" />} />
        <Route path="/video/:id" element={<VideoPage />} />
        
        {/* AI assistant - defaults to first module */}
        <Route path="/ai" element={<Navigate to="/ai/1" />} />
        <Route path="/ai/:id" element={<AiPage />} />
        
        {/* Simulation exercises */}
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/simulation/password" element={<PasswordPractice />} />
        <Route path="/simulation/social" element={<SocialMediaPractice />} />
        <Route path="/simulation/scam" element={<ScamEmailPractice />} />
        <Route path="/simulation/text" element={<TextTrapPractice />} />
        
        {/* Case study details */}
        <Route path="/home/case/:id" element={<CaseDetail />} />
      </Routes>
    </div>
  );
}

export default App;