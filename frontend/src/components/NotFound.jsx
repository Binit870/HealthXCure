import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHome, FaQuestionCircle } from 'react-icons/fa'; // Importing useful icons

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-900 to-blue-900 min-h-screen pt-8 text-white flex flex-col items-center justify-center text-center px-4">
      
      {/* 404 Header */}
      <div className="flex items-center space-x-4 mb-8">
        <FaHeartbeat className="text-6xl text-cyan-400" />
        <h1 className="text-7xl md:text-8xl font-black text-white">404</h1>
      </div>
      
      {/* Main Message */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
        Oops! It seems you've stumbled upon a page that doesn't exist. The URL might be incorrect, or the page may have been moved.
      </p>

      {/* Helpful Links */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-cyan-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 transform hover:scale-105"
        >
          <FaHome className="mr-2" /> Go to Homepage
        </Link>
        <Link 
          to="/services" 
          className="inline-flex items-center justify-center bg-transparent border-2 border-cyan-600 text-cyan-400 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-cyan-600 hover:text-white transition duration-300 transform hover:scale-105"
        >
          <FaQuestionCircle className="mr-2" /> Explore Our Services
        </Link>
      </div>

    </div>
  );
};

export default NotFound;