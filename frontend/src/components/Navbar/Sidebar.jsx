import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import MenuLinks from "./MenuLinks";
import SearchBar from "./SearchBar";

const Sidebar = ({
  isOpen,
  sidebarRef,
  searchQuery,
  handleSearchChange,
  handleKeyPress,
  handleLinkClick,
  toggleSidebar,
  handleLogout,
  isLoggedIn,
}) => (
  <>
    {/* Overlay */}
    <div
      className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={toggleSidebar}
    />

    {/* Sidebar */}
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg 
                  transform transition-transform duration-300 z-40 
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gradient">Menu</h3>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {isLoggedIn ? (
          <>
            <SearchBar
              searchQuery={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="mb-6"
            />

            <ul className="space-y-4">
              {MenuLinks.map(({ to, label, icon: Icon, isLogout }) => (
                <li key={label}>
                  {isLogout ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                      className="flex items-center space-x-2 py-2 w-full text-left hover:bg-gray-800 rounded"
                    >
                      <Icon /> <span>{label}</span>
                    </button>
                  ) : (
                    <Link
                      to={to}
                      className="flex items-center space-x-2 py-2 hover:bg-gray-800 rounded"
                      onClick={handleLinkClick}
                    >
                      <Icon /> <span>{label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex flex-col space-y-4 mt-6">
            <Link
              to="/login"
              onClick={toggleSidebar}
              className="px-4 py-2 rounded-2xl bg-white/20 text-white text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={toggleSidebar}
              className="px-4 py-2 rounded-2xl bg-white/20 text-white text-center"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  </>
);

export default Sidebar;
