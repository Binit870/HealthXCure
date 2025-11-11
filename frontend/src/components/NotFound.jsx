import React from 'react';
import { Link } from 'react-router-dom';
// Changed import source to 'lucide-react' to resolve compilation error
import { HeartPulse, Home, HelpCircle } from 'lucide-react'; 

const NotFound = () => {
  return (
    // Simple white background and primary text in a dark gray
    <div className="bg-white min-h-screen pt-8 text-gray-800 flex flex-col items-center justify-center text-center px-4">
      
      {/* 404 Header */}
      <div className="flex items-center space-x-4 mb-8">
        {/* Teal Heart Icon (using HeartPulse from lucide-react) */}
        <HeartPulse className="w-16 h-16 text-teal-500" />
        {/* Strong Teal 404 Text */}
        <h1 className="text-7xl md:text-8xl font-black text-teal-600">404</h1>
      </div>
      
      {/* Main Message */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Oops! It seems you've stumbled upon a page that doesn't exist. The URL might be incorrect, or the page may have been moved.
      </p>

      {/* Helpful Links */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link 
          to="/" 
          // Solid Teal Button
          className="inline-flex items-center justify-center bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
        >
          {/* Home Icon (using Home from lucide-react) */}
          <Home className="mr-2 w-5 h-5" /> Go to Homepage
        </Link>
        <Link 
          to="/services" 
          // Teal Outline Button
          className="inline-flex items-center justify-center bg-transparent border-2 border-teal-500 text-teal-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition duration-300 transform hover:scale-105"
        >
          {/* Question Icon (using HelpCircle from lucide-react) */}
          <HelpCircle className="mr-2 w-5 h-5" /> Explore Our Services
        </Link>
      </div>

    </div>
  );
};

export default NotFound;
