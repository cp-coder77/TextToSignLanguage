import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import JumpToTop from './components/JumpToTop';
import Home from './pages/Home';
import Converter from './pages/Converter';
import Learn from './pages/Learn';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import VideoTutorials from './pages/VideoTutorials';
import Guides from './pages/Guides';
import Quizzes from './pages/Quizzes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-base via-white to-base relative overflow-hidden">
        <div className="cloud-animation">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video-tutorials" element={<VideoTutorials />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Routes>

        <Footer />
        <JumpToTop />
      </div>
    </Router>
  );
}

export default App;