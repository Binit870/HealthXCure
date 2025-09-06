import React, { useRef } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";

const UserProfileSection = ({
  user,
  uploading,
  isEditing,
  setIsEditing,
  handleImageUpload,
}) => {
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing && fileInputRef.current) {
      fileInputRef.current.value = null; // Reset input to allow re-upload of same file
      fileInputRef.current.click();      // Open file dialog
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-12">
      {/* Profile Image Wrapper */}
      <div className="relative group w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-transparent 
                      bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 p-1 shadow-2xl
                      animate-gradient-x">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="User Profile"
            className="w-full h-full rounded-full object-cover border-4 border-gray-800 
                       transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <FaUserCircle className="w-full h-full text-gray-400 rounded-full bg-gray-800 p-2 
                                   group-hover:text-gray-200 transition-colors duration-300" />
        )}

        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white 
                     hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center 
                     justify-center text-lg transform hover:scale-110 active:scale-95
                     animate-pulse"
          aria-label="Edit profile picture"
          disabled={uploading}
        >
          <FaEdit />
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>

      {/* Uploading Indicator */}
      {uploading && (
        <p className="text-sm text-blue-400 mt-3 animate-pulse">
          Uploading...
        </p>
      )}

      {/* Welcome Message */}
      <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 
                     via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-4 mb-2
                     drop-shadow-md">
        Welcome back, {user?.name || "User"}! 👋
      </h3>

      {/* Subtitle */}
      <p className="text-gray-300 max-w-2xl mx-auto text-lg tracking-wide">
        Your personalized <span className="text-cyan-400 font-medium">health overview</span>, at a glance.
      </p>
    </div>
  );
};

export default UserProfileSection;
