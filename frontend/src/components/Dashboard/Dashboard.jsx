import React, { useState } from "react";
import { FaUtensils, FaTired, FaFileAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/Api";

import UserProfileSection from "./UserProfileSection";
import HistorySection from "./HistorySection";
import NotificationSection from "./NotificationSection";

const Dashboard = () => {
  const { user, token, updateUser, loading } = useAuth();

  const [dietHistory, setDietHistory] = useState([]);
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState(() => {
    return user?.profileImageUrl || "";
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!user || !user._id) {
      alert("You are not authenticated. Please log in again.");
      return;
    }

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await API.post(`/user/${user._id}/profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = response.data.user;

      if (updatedUser.profileImageUrl) {
        setProfileImageUrl(updatedUser.profileImageUrl);
        updatedUser.profileImageUrl = updatedUser.profileImageUrl;
      }

      if (updateUser) updateUser({ ...updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditingProfileImage(false);
    } catch (error) {
      console.error("❌ Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // --- Light Theme Loading State ---
  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center bg-mint-50/50 text-teal-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
        <h3 className="text-4xl font-extrabold text-teal-700">
          Loading your HealthCure Dashboard...
        </h3>
        <p className="text-gray-600">Please wait while we fetch your personalized data.</p>
      </div>
    );
  }

  // --- Light Theme Not Logged In State ---
  if (!user) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center bg-mint-50/50 text-teal-700">
        <h3 className="text-4xl font-extrabold text-teal-700">
          You must be logged in to view the dashboard
        </h3>
      </div>
    );
  }

  // --- Dashboard Main View ---
  return (
    <section
      id="dashboard"
      className="relative pt-20 min-h-screen px-4 md:px-10 lg:px-20 mb-20 text-center text-gray-800 overflow-hidden"
      style={{
        // Soft, light background gradient
        background: "linear-gradient(180deg, #F0FFF9 0%, #F5F7FF 100%)",
      }}
    >
      {/* Redesigned Background glow effects (Teal/Lavender) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-lavender-200/40 blur-3xl rounded-full animate-pulse delay-2000" />
      </div>

      {/* User Profile Section */}
      <UserProfileSection
        user={user}
        uploading={uploading}
        isEditing={isEditingProfileImage}
        setIsEditing={setIsEditingProfileImage}
        handleImageUpload={handleImageUpload}
        profileImageUrl={profileImageUrl}
      />

      {/* Redesigned Introductory Text */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-md md:text-lg">
        ✨ Here are your{" "}
        <span className="text-teal-500 font-semibold">latest health metrics</span> and{" "}
        <span className="text-lavender-500 font-semibold">history</span>, guiding you towards a healthier life.
      </p>

      {/* Notifications */}
      <div className="max-w-6xl mx-auto mt-12 relative z-10 mb-12">
        <NotificationSection user={user} />
      </div>

      {/* History Sections */}
      <div className="max-w-6xl mx-auto py-3 space-y-8">
        <HistorySection
          title="Diet History"
          icon={FaUtensils}
          historyData={dietHistory}
          emptyMessage="No diet history recorded yet. Start tracking your meals!"
        />
        <HistorySection
          title="Symptom History"
          icon={FaTired}
          historyData={symptomHistory}
          emptyMessage="No symptom history recorded. Track your symptoms for better insights!"
        />
        <HistorySection
          title="Report History"
          icon={FaFileAlt}
          historyData={reportHistory}
          emptyMessage="No reports available. Upload your health reports here."
        />
      </div>
    </section>
  );
};

export default Dashboard;