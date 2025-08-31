import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
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

function App() {
  const location = useLocation();

  // Define which paths should hide the navbar and footer
  const pathsWithoutNavbar = ['/login', '/signup'];
  const pathsWithoutFooter = ['/login', '/signup', '/chat'];

  const hideNavbar = pathsWithoutNavbar.includes(location.pathname);
  const hideFooter = pathsWithoutFooter.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 font-inter">
      {!hideNavbar && <Navbar />}

      <div className="flex-grow flex flex-col pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/community' element={<Community/>}></Route>
          <Route path='/about' element={<About/>}></Route>

          {/* Protected routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWithAssistant />
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
        </Routes>

      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
