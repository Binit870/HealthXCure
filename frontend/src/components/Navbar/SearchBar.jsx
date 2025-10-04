import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, onChange, onKeyPress, className }) => (
  <div className={`relative ${className || ""}`}>
    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={onChange}
      onKeyDown={onKeyPress}
      className="px-4 py-2 pl-10 rounded-2xl bg-white/20 border border-white/30 
                 text-white placeholder-gray-300 focus:outline-none 
                 focus:ring-2 focus:ring-white/50 transition w-full"
    />
  </div>
);

export default SearchBar;
