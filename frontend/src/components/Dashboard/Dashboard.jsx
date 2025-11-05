import React, { useState, useEffect } from "react";
import { FaUtensils, FaTired, FaFileAlt, FaPlus, FaHeartbeat } from "react-icons/fa";
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

  // ✅ FETCH USER HISTORY
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
        toast.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [user, token]);

  // ✅ HANDLE PROFILE IMAGE UPLOAD
  // ✅ HANDLE PROFILE IMAGE UPLOAD
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

  // 1. DEFINED: Start a loading toast notification and capture its ID
  const loadingToastId = toast.loading("Uploading profile image...");

  try {
    const res = await API.post(`/user/${user._id}/profile-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const updatedUser = res.data.user;

    if (updatedUser.profileImageUrl) {
      // The server is returning the full absolute URL, which is correct.
      setProfileImageUrl(updatedUser.profileImageUrl);
      updateUser({ ...updatedUser });
      // localStorage.setItem("user", JSON.stringify(updatedUser)); // updateAuth should handle this

      // 2. USED: Success toast notification replaces the loading toast
      toast.success("Profile image updated successfully!", { id: loadingToastId });
    } else {
      // 3. USED: Error toast if the URL is missing
      toast.error("Upload successful, but image URL is missing.", { id: loadingToastId });
    }
    setIsEditingProfileImage(false);
  } catch (err) {
    console.error("❌ Image upload failed:", err);
    // 4. USED: Error toast on API failure
    toast.error("Failed to upload image. Please try again.", { id: loadingToastId });
  } finally {
    setUploading(false);
  }
};

  // ✅ LOADING + NOT LOGGED IN STATES
  if (loading)
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-mint-50 to-indigo-50 text-teal-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500 mb-4"></div>
        <h3 className="text-3xl font-extrabold">Loading your HealthCure Dashboard...</h3>
        <p className="text-gray-500">Fetching your wellness insights...</p>
      </div>
    );

  if (!user)
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-mint-50 to-indigo-50 text-teal-700">
        <h3 className="text-3xl font-extrabold">You must be logged in to view your dashboard</h3>
      </div>
    );

  // ✅ DASHBOARD MAIN VIEW
  return (
    <section
      id="dashboard"
      className="relative pt-20 min-h-screen px-4 md:px-10 lg:px-20 mb-20 text-gray-800 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F0FFF9 0%, #F5F7FF 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100/30 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto pt-8 pb-12">
        {/* PROFILE ROW */}
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
        </div>

        {/* WELCOME MESSAGE */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-md md:text-lg text-center">
          ✨ Welcome back, <span className="text-teal-500 font-semibold">{user.name}</span>!
          Here’s your <span className="text-indigo-500 font-semibold">health snapshot</span> and progress history.
        </p>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Notifications + Actions */}
          <div className="lg:col-span-1 space-y-8">
            <NotificationSection user={user} />

            <div className="rounded-3xl p-6 shadow-md bg-white border border-teal-100 text-left">
              <h5 className="text-xl font-bold text-teal-600 mb-3 flex items-center gap-2">
                <FaHeartbeat /> Quick Actions
              </h5>

              <button
                onClick={() => navigate("/diet-planner")}
                className="w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
              >
                <FaUtensils /> Log Today’s Meal
              </button>

              <button
                onClick={() => navigate("/symptom-checker")}
                className="w-full text-center mt-3 border border-indigo-400 text-indigo-500 hover:bg-indigo-50 font-semibold py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
              >
                <FaTired /> Symptom Checker
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="w-full text-center mt-3 border border-pink-300 text-pink-500 hover:bg-pink-50 font-semibold py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
              >
                <FaFileAlt /> Upload Report
              </button>
            </div>
          </div>

          {/* RIGHT: History Sections */}
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
