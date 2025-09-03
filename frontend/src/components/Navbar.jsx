import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    FaBars, 
    FaSearch, 
    FaTimes, 
    FaFileAlt, 
    FaCalendarCheck, 
    FaSignOutAlt, 
    FaUserMd, 
    FaStethoscope, 
    FaChartBar, 
    FaUtensils, 
    FaComments,
    FaHome
} from 'react-icons/fa';
import { IoFitnessOutline } from 'react-icons/io5';

const Navbar = () => {
    // State to simulate user login status
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // State to control sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // State to store the search query
    const [searchQuery, setSearchQuery] = useState("");
    // Ref to handle clicks outside the sidebar
    const sidebarRef = useRef(null);
    // Initialize the useNavigate hook
    const navigate = useNavigate();

    // Toggles the sidebar's visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handles the logout functionality
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsSidebarOpen(false);
        // You can add a redirect to the login or home page here
        navigate("/");
    };
    
    // Function to handle link clicks that should close the sidebar
    const handleLinkClick = () => {
        setIsSidebarOpen(false);
    };

    // Handler for search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle the search and redirect
    const handleSearch = (query) => {
        const normalizedQuery = query.toLowerCase().trim();

        // A map of keywords to their corresponding routes
        const pageMappings = {
            
            'find doctors': '/find-doctors',
            'doctors': '/find-doctors',
            'diagnosis': '/symptom-checker',
            'symptom checker': '/symptom-checker',
            'reports': '/reports',
            'my appointments': '/book-appointment',
            'appointments': '/book-appointment',
            'book appointment': '/book-appointment',
            'chat with assistant': '/chat',
            'chat': '/chat',
            'assistant': '/chat',
            'diet planner': '/diet-planner',
            'diet': '/diet-planner',
            'services': '/services',
            'about': '/about',
            'community': '/community'
        };

        const destination = pageMappings[normalizedQuery];

        if (destination) {
            // If a match is found, navigate to that page
            navigate(destination);
        } else {
            // If no direct match, navigate to a 'not found' page.
            // You must have this route configured in your App.jsx
            navigate('/not-found');
        }
    };

    // Handler for key presses in the search input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchQuery.trim() !== "") {
            handleSearch(searchQuery); // Call the new search handler
            setSearchQuery(""); // Clear the input after searching
            setIsSidebarOpen(false); // Close sidebar on search
        }
    };

    // Effect to handle clicks outside the sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        
        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-white/10 border-b border-white/20 backdrop-filter shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
                    {/* Logo and Sidebar Toggle */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && (
                            <button onClick={toggleSidebar} className="text-white text-xl">
                                <FaBars />
                            </button>
                        )}
                        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gradient cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <IoFitnessOutline className="text-cyan-400"/>
                            <span>HealthCure</span>
                        </Link>
                    </div>

                    {/* Links for desktop/tablet (hidden on small screens) */}
                    <div className="hidden md:flex space-x-12 text-white font-medium">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/find-doctors">Doctors</Link>
                        <Link to="/about">About</Link>
                        <Link to="/community">Community</Link>
                    </div>

                    {/* Buttons or Search Bar for desktop/tablet */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {isLoggedIn ? (
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyPress}
                                    className="px-4 py-2 pl-10 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                                />
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-2xl bg-white/20 border border-white/30 text-white hover:bg-white/30 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-2xl bg-white/20 border border-white/30 text-white hover:bg-white/30 transition"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Sidebar component */}
            {isLoggedIn && (
                <>
                    {/* Overlay to handle clicks outside */}
                    <div 
                        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    {/* Sidebar container */}
                    <div 
                        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                        ref={sidebarRef}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gradient">Menu</h3>
                                <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                                    <FaTimes />
                                </button>
                            </div>
                            
                            {/* Search bar inside the sidebar */}
                            <div className="relative w-full mb-6">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyPress}
                                    className="px-4 py-2 pl-10 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition w-full"
                                />
                            </div>
                            
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaHome /> <span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaChartBar /> <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/find-doctors" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaUserMd /> <span>Find Doctor</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/symptom-checker" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaStethoscope /> <span>Diagnosis</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/reports" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaFileAlt /> <span>Reports</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/book-appointment" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaCalendarCheck /> <span>My Appointments</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/chat" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaComments /> <span>Chat With Assistant</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/diet-planner" className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded" onClick={handleLinkClick}>
                                        <FaUtensils /> <span>Diet Planner</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="flex items-center space-x-2 py-2 w-full text-left hover:bg-gray-800 rounded">
                                        <FaSignOutAlt /> <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;