import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import pageMappings from "./PageMappings";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { token, logout, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLinkClick = () => setIsSidebarOpen(false);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    navigate(pageMappings[normalizedQuery] || "/not-found");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      handleSearch(searchQuery);
      setSearchQuery("");
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-white/10 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
          <span>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-teal-700 border-b border-white/20 shadow-md h-16 sm:h-20 flex items-center">
  <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-6 py-3 lg:py-4">
    {/* Left: Logo & Toggle */}
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl hover:text-teal-200 transition"
      >
        <FaBars />
      </button>

      <Link
        to="/"
        className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-teal-200 transition"
      >
        <IoFitnessOutline className="text-teal-200 text-3xl" />
        <span className="tracking-wide">HealthXCure</span>
      </Link>
    </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center space-x-10 text-white font-medium">
            <Link to="/" className="hover:text-teal-200 transition-colors">
              Home
            </Link>
            <Link to="/symptom-checker" className="hover:text-teal-200 transition-colors">
              Symptica
            </Link>
            <Link to="/find-doctors" className="hover:text-teal-200 transition-colors">
              Doctors
            </Link>
            <Link to="/diet-planner" className="hover:text-teal-200 transition-colors">
              DietBuddy
            </Link>
            <Link to="/community" className="hover:text-teal-200 transition-colors">
              Community
            </Link>
          </div>

          {/* Right: Search + Auth */}
          <div className="flex items-center space-x-4">
            {/* SearchBar only on md and above, and hidden when sidebar open */}
            <div className={`hidden md:flex items-center ${isSidebarOpen ? "hidden" : ""}`}>
              <SearchBar
                searchQuery={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            {token ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/notifications"
                  className="relative text-white text-xl hover:text-teal-200 transition"
                >
                  <FaBell />
                </Link>
                <button
                  onClick={logout}
                  className="hidden md:block px-4 py-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-1 md:px-4 md:py-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 md:px-4 md:py-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleKeyPress={handleKeyPress}
        handleLinkClick={handleLinkClick}
        toggleSidebar={toggleSidebar}
        handleLogout={logout}
        isLoggedIn={!!token}
      />
    </>
  );
};

export default Navbar;
