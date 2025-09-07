import React from 'react';

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
import Community from './components/Community/Community';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatWithAssistant from './pages/ChatWithAssistant';
import SymptomChecker from './components/SymptomChecker/SymptomChecker';
import FindDoctors from './pages/FindDoctors';
import BookAppointment from './pages/BookAppointment';
import About from './pages/About';
import FAQ from './pages/FAQ';
import TermsAndCondition from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Help from './pages/Help';
import FitnessPlanner from './pages/FitnessPlanner';
function App() {
  const location = useLocation();

  // Define which paths should hide the navbar and footer.
  // Use a Set for efficient lookup and include a check for trailing slashes.
  const pathsWithoutNavbar = new Set(['/login', '/signup']);
  const pathsWithoutFooter = new Set(['/login', '/signup', '/chat']);

  // Normalize the current path for a reliable check.
  const normalizedPathname = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1) // Remove trailing slash
    : location.pathname;

  const hideNavbar = pathsWithoutNavbar.has(normalizedPathname.toLowerCase());
  const hideFooter = pathsWithoutFooter.has(normalizedPathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 font-inter">
      {!hideNavbar && <Navbar />}

      <div className={`flex-grow flex flex-col ${!hideNavbar ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/services' element={<Services />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/faq' element={<FAQ />}></Route>
          <Route path='/terms' element={<TermsAndCondition />}></Route>
          <Route path='/privacy-policy' element={<PrivacyPolicy />}></Route>
          <Route path='/help' element={<Help />}></Route>

          {/* Protected routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWithAssistant />
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
          <Route path="/symptom-checker" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />


          <Route
            path="/diet-planner"
            element={
              <ProtectedRoute>
                <DietPlanner />
              </ProtectedRoute>
            }
          />
          <Route path="/find-doctors" element={<ProtectedRoute><FindDoctors /></ProtectedRoute>}></Route>
          <Route path="/book-appointment" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;