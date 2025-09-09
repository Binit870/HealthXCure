import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import  pageMappings  from "./PageMappings";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
    navigate("/");
  };

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
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-white/10 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
          {/* Logo + Sidebar toggle */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <button onClick={toggleSidebar} className="text-white text-xl">
                <FaBars />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gradient">
              <IoFitnessOutline className="text-cyan-400" />
              <span>HealthCure</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-12 text-white font-medium">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/find-doctors">Doctors</Link>
            <Link to="/about">About</Link>
            <Link to="/community">Community</Link>
            <Link 
                            to="/contact" 
                           
                        >
                            Contact Us
                        </Link>
          </div>

          {/* Search/Login */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              <SearchBar
                searchQuery={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-2xl bg-white/20 text-white">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-2xl bg-white/20 text-white">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarRef={sidebarRef}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleKeyPress={handleKeyPress}
          handleLinkClick={handleLinkClick}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
