import React, { useRef } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";

const UserProfileSection = ({
  user,
  uploading,
  isEditing,
  setIsEditing,
  handleImageUpload,
  profileImageUrl,
}) => {
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing && fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-12">
      <div
        // Redesigned gradient border with soft Teal and Lavender colors
        className="relative group w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-transparent 
                    bg-gradient-to-tr from-teal-400 via-mint-400 to-lavender-400 p-1 shadow-lg 
                    animate-gradient-x"
      >
        {profileImageUrl ? (
          <img
            key={profileImageUrl}
            src={profileImageUrl}
            alt="User Profile"
            // Inner border color switched to light gray/white for contrast
            className="w-full h-full rounded-full object-cover border-4 border-white transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // Placeholder background color switched to light gray
          <FaUserCircle className="w-full h-full text-gray-400 rounded-full bg-gray-100 p-2" />
        )}

        <button
          onClick={handleEditClick}
          // Edit button uses primary teal color
          className="absolute bottom-0 right-0 p-2 bg-teal-500 rounded-full text-white 
                     hover:bg-teal-600 transition-all duration-300 shadow-md flex items-center 
                     justify-center text-lg transform hover:scale-110 active:scale-95"
          aria-label="Edit profile picture"
          disabled={uploading}
        >
          <FaEdit />
        </button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>

      {uploading && <p className="text-sm text-teal-500 mt-3 animate-pulse">Uploading...</p>}

      {/* Header text color switched to deep Teal-700 */}
      <h3 className="text-4xl md:text-5xl font-extrabold text-teal-700 mt-4 mb-2">
        Welcome back, {user?.name || "User"}! 👋
      </h3>

      {/* Subtext color switched to a legible dark gray */}
      <p className="text-gray-600 max-w-2xl mx-auto text-lg tracking-wide">
        Your personalized <span className="text-teal-500 font-medium">health overview</span>, at a glance.
      </p>
    </div>
  );
};

export default UserProfileSection;