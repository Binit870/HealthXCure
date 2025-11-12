import { FaSearch } from "react-icons/fa";

const SearchBar = ({ className = "", searchQuery, onChange, onKeyPress, compact = false }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <FaSearch
        className={`absolute left-3 text-white/80 ${compact ? "text-xs" : "text-sm"} pointer-events-none`}
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onChange}
        onKeyDown={onKeyPress}
        className={`${
          compact
            ? "h-8 pl-8 pr-3 text-xs"
            : "h-9 pl-9 pr-3 text-sm w-60 md:w-72"
        } rounded-full bg-white/25 border border-white/30 text-white placeholder-white/70
        focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all duration-200 w-full`}
      />
    </div>
  );
};

export default SearchBar;
