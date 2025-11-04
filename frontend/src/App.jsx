import React from 'react';
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Reports from './components/Reports/Reports';
import NotFound from './components/NotFound';
import Services from './components/Services';
import DietPlanner from './components/Diet/DietPlanner';

import SymptomChecker from './components/SymptomChecker/SymptomChecker';
import FitnessPlanner from './components/Fitness/FitnessPlanner';
import ContactSection from './components/LandingPage/ContactSection';
import Community from './components/Community/Community';
import Notification from './pages/Notification';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatWithAssistant from './pages/ChatWithAssistant/ChatWithAssistant';
import FindDoctors from './pages/Doctors/FindDoctors';

import About from './pages/About';
import FAQ from './pages/FAQ';
import TermsAndCondition from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Help from './pages/Help';

import ScrollToTop from './ScrollToTop';

function App() {
  const location = useLocation();

  // Hide Navbar/Footer on specific routes
  const pathsWithoutNavbar = new Set(['/login', '/signup', '/chat']);
  const pathsWithoutFooter = new Set(['/login', '/signup', '/chat']);

  const normalizedPathname = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const hideNavbar = pathsWithoutNavbar.has(normalizedPathname.toLowerCase());
  const hideFooter = pathsWithoutFooter.has(normalizedPathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}

      <div className={`flex-grow flex flex-col ${!hideNavbar ? 'pt-16' : ''}`}>
        <Toaster position="top-center" />
        <Routes>
          {/* Public Pages */}
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<TermsAndCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<ContactSection />} />



          {/* Protected Pages */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWithAssistant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fitness"
            element={
              <ProtectedRoute>
                <FitnessPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/symptom-checker"
            element={
              <ProtectedRoute>
                <SymptomChecker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/diet-planner"
            element={
              <ProtectedRoute>
                <DietPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-doctors"
            element={
              <ProtectedRoute>
                <FindDoctors />
              </ProtectedRoute>
            }
          />




          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
