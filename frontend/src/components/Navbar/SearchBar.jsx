import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, onChange, onKeyPress, className = "" }) => (
  <div className={`relative flex items-center ${className}`}>
    <FaSearch className="absolute left-3 text-white/70 text-sm pointer-events-none" />
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={onChange}
      onKeyDown={onKeyPress}
      className="w-48 md:w-56 h-9 pl-9 pr-3 text-sm rounded-full bg-white/20 border border-white/25 
                 text-white placeholder-white/70 focus:outline-none focus:bg-white/25 
                 focus:border-white/40 transition-all duration-200"
    />
  </div>
);

export default SearchBar;
