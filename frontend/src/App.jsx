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
import FAQ from './pages/FAQ';
import TermsAndCondition from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Help from './pages/Help';
import Reports from './pages/Reports';
import Services from './components/Services';
import NotFound from './components/NotFound';
import ContactSection from './pages/ContactSection';
import DoctorProfile from './pages/DoctorProfile'; // <-- Add this import

function App() {
  const location = useLocation();

  // Hide Navbar/Footer on specific routes
  const pathsWithoutNavbar = new Set(['/login', '/signup']);
  const pathsWithoutFooter = new Set(['/login', '/signup', '/chat']);

  const normalizedPathname = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const hideNavbar = pathsWithoutNavbar.has(normalizedPathname.toLowerCase());
  const hideFooter = pathsWithoutFooter.has(normalizedPathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 font-inter">
      {!hideNavbar && <Navbar />}

      <div className={`flex-grow flex flex-col ${!hideNavbar ? 'pt-16' : ''}`}>
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

          {/* Doctor Profile Route */}
          <Route path="/doctor/:id" element={<DoctorProfile />} /> {/* <-- Added */}

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
          <Route
            path="/find-doctors"
            element={
              <ProtectedRoute>
                <FindDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute>
                <BookAppointment />
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
