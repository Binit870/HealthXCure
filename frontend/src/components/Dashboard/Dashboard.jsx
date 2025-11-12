import React, { useState, useEffect } from "react";
import { FaUtensils, FaTired, FaFileAlt, FaHeartbeat } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/Api";
import UserProfileSection from "./UserProfileSection";
import HistorySection from "./HistorySection";
import NotificationSection from "./NotificationSection";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, token, updateUser, loading } = useAuth();
  const navigate = useNavigate();

  const [dietHistory, setDietHistory] = useState([]);
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || "");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token || !user) return;
      try {
        const [dietRes, symptomRes, reportRes] = await Promise.all([
          API.get("/diet/history", { headers: { Authorization: `Bearer ${token}` } }),
          API.get("/symptoms/history", { headers: { Authorization: `Bearer ${token}` } }),
          API.get("/reports/history", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setDietHistory(Array.isArray(dietRes.data) ? dietRes.data : []);
        setSymptomHistory(Array.isArray(symptomRes.data.history) ? symptomRes.data.history : []);
        setReportHistory(Array.isArray(reportRes.data) ? reportRes.data : []);
      } catch (error) {
        toast.error("Failed to fetch history");
      }
    };

    fetchHistory();
  }, [user, token]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!user?._id) {
      toast.error("Please log in again to upload your image.");
      return;
    }
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("profileImage", file);
    const loadingToastId = toast.loading("Uploading profile image...");

    try {
      const res = await API.post(`/user/${user._id}/profile-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedUser = res.data.user;

      if (updatedUser.profileImageUrl) {
        setProfileImageUrl(updatedUser.profileImageUrl);
        updateUser({ ...updatedUser });
        toast.success("Profile image updated successfully!", { id: loadingToastId });
      } else {
        toast.error("Upload successful, but image URL missing.", { id: loadingToastId });
      }
      setIsEditingProfileImage(false);
    } catch (err) {
      toast.error("Failed to upload image. Please try again.", { id: loadingToastId });
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center bg-teal-50 text-teal-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500 mb-4"></div>
        <h3 className="text-3xl font-extrabold">Loading your HealthCure Dashboard...</h3>
        <p className="text-gray-500">Fetching your wellness insights...</p>
      </div>
    );

  if (!user)
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center bg-teal-50 text-teal-700">
        <h3 className="text-3xl font-extrabold">You must be logged in to view your dashboard</h3>
      </div>
    );

  return (
    <section
      id="dashboard"
      className="relative pt-20 min-h-screen px-6 md:px-10 text-gray-800 overflow-hidden bg-gradient-to-b from-teal-50 to-white"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-10 pb-20">
        {/* Profile Centered */}
        <UserProfileSection
          user={user}
          uploading={uploading}
          isEditing={isEditingProfileImage}
          setIsEditing={setIsEditingProfileImage}
          handleImageUpload={handleImageUpload}
          profileImageUrl={profileImageUrl}
        />

        {/* Quick Actions */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-teal-100 p-6 text-center">
          <h5 className="text-2xl font-bold text-teal-700 mb-5 flex justify-center items-center gap-2">
            <FaHeartbeat /> Quick Actions
          </h5>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/diet-planner")}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
            >
              <FaUtensils /> Plan Today’s Diet
            </button>
            <button
              onClick={() => navigate("/symptom-checker")}
              className="flex-1 border border-indigo-400 text-indigo-500 hover:bg-indigo-50 font-semibold py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
            >
              <FaTired /> Check Your Symptoms
            </button>
            <button
              onClick={() => navigate("/reports")}
              className="flex-1 border border-pink-300 text-pink-500 hover:bg-pink-50 font-semibold py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
            >
              <FaFileAlt /> Upload Reports
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="w-full max-w-3xl">
          <NotificationSection user={user} />
        </div>

        {/* History Sections */}
        <div className="w-full max-w-3xl space-y-8">
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
    </section>
  );
};

export default Dashboard;
