import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './components/SearchResults';
import ChatWithAssistant from './pages/ChatWithAssistant';
import ProtectedRoute from './components/ProtectedRoute';
import SymptomChecker from './pages/SymptomChecker';
import FindDoctors from './pages/FindDoctors';
import BookAppointment from './pages/BookAppointment';
import DietPlanner from './pages/DietPlanner';
import Community from './pages/Community';
import About from './pages/About';
import Dashboard from './components/Dashboard';
import FAQ from './pages/FAQ.JSX';
import TermsAndCondition from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Help from './pages/Help';
import Reports from './pages/Reports';
import Services from './components/Services';
import NotFound from './components/NotFound';
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
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResults />
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