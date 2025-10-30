import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { findPage } from "./PageMappings";

const SearchBar = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

const handleSearch = () => {
  const route = findPage(searchQuery);
  navigate(route || "/not-found");
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <FaSearch className="absolute left-3 text-white/70 text-sm pointer-events-none" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-48 md:w-56 h-9 pl-9 pr-3 text-sm rounded-full bg-white/20 border border-white/25 
                   text-white placeholder-white/70 focus:outline-none focus:bg-white/25 
                   focus:border-white/40 transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
