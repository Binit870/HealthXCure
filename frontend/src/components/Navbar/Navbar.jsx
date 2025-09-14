import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import pageMappings from "./PageMappings";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
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

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-white/10 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Left Section: Logo + Sidebar Toggle */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="text-white text-xl">
              <FaBars />
            </button>
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
              <IoFitnessOutline className="text-cyan-400" />
              <span>HealthCure</span>
            </Link>
          </div>

          {/* Center Section: Desktop Links */}
          <div className="hidden lg:flex space-x-8 text-white font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
            <Link to="/find-doctors" className="hover:text-cyan-400 transition-colors">Doctors</Link>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link to="/community" className="hover:text-cyan-400 transition-colors">Community</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
          </div>

          {/* Right Section: Search + Auth/Notifications */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar
                searchQuery={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            {token ? (
              <div className="flex items-center space-x-4">
                {/* Notification Bell with Badge */}
                <Link
                  to="/notifications"
                  className="relative text-white text-xl hover:text-cyan-400 transition-colors"
                >
                  <FaBell />
                  {/* Example Notification Badge (optional) */}
                  
                </Link>
                <button
                  onClick={logout}
                  className="hidden md:block px-4 py-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link to="/login" className="px-3 py-1 md:px-4 md:py-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-3 py-1 md:px-4 md:py-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-colors">
                  Signup
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </nav>

      {/* Sidebar (remains unchanged) */}
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