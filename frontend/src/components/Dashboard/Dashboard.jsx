import React, { useState, useEffect } from "react";
import { FaUtensils, FaTired, FaFileAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/Api";

// Import the new KeyMetricsSection
import KeyMetricsSection from "./KeyMetricsSection"; 
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

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token || !user) return;
      try {
        const dietRes = await API.get("/diet/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDietHistory(dietRes.data.data || []);

        const symptomRes = await API.get("/symptom/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSymptomHistory(symptomRes.data.data || []);

        const reportRes = await API.get("/report/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReportHistory(reportRes.data.data || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [user, token]);

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
        background: "linear-gradient(180deg, #F0FFF9 0%, #F5F7FF 100%)",
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100/30 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto pt-8 pb-12">
        {/* TOP ROW: Profile + Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <UserProfileSection
              user={user}
              uploading={uploading}
              isEditing={isEditingProfileImage}
              setIsEditing={setIsEditingProfileImage}
              handleImageUpload={handleImageUpload}
              profileImageUrl={profileImageUrl}
            />
          </div>

          <div className="lg:col-span-2 text-left">
            <KeyMetricsSection user={user} />
          </div>
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-md md:text-lg">
          ✨ Your personalized <span className="text-teal-500 font-semibold">health snapshot</span> and{" "}
          <span className="text-indigo-500 font-semibold">activity history</span>, guiding your wellness journey.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Notifications + Actions */}
          <div className="lg:col-span-1 space-y-8">
            <NotificationSection user={user} />

            <div className="rounded-3xl p-6 shadow-md bg-white border border-teal-100 text-left">
              <h5 className="text-xl font-bold text-teal-600 mb-3">Quick Actions</h5>
              <button className="w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200">
                Log Today's Meal 🍎
              </button>
              <button className="w-full text-center mt-3 border border-indigo-400 text-indigo-500 hover:bg-indigo-50 font-semibold py-3 rounded-xl transition-colors duration-200">
                Symptom Checker 🩺
              </button>
            </div>
          </div>

          {/* RIGHT: History */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-bold text-gray-800 text-left mb-4 border-b-2 border-indigo-200 pb-2">
              Activity and Data History
            </h3>

            <HistorySection
              title="Diet History"
              icon={FaUtensils}
              historyData={dietHistory.slice(0, 3)}
              emptyMessage="No diet history recorded yet. Start tracking your meals!"
              showViewAll={true}
            />

            <HistorySection
              title="Symptom History"
              icon={FaTired}
              historyData={symptomHistory.slice(0, 3)}
              emptyMessage="No symptom history recorded. Track your symptoms for better insights!"
              showViewAll={true}
            />

            <HistorySection
              title="Report History"
              icon={FaFileAlt}
              historyData={reportHistory.slice(0, 3)}
              emptyMessage="No reports available. Upload your health reports here."
              showViewAll={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
