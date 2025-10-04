import React, { useState, useEffect } from "react";
import { FaUtensils, FaTired, FaFileAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/Api";

import UserProfileSection from "./UserProfileSection";

import HistorySection from "./HistorySection";
import NotificationSection from "./NotificationSection";

const Dashboard = () => {
    const { user, token, updateUser } = useAuth();


    const [dietHistory, setDietHistory] = useState([]);
    const [symptomHistory, setSymptomHistory] = useState([]);
    const [reportHistory, setReportHistory] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];

        if (!user || !user._id) {
            console.error("User is not available.");
            alert("You are not authenticated. Please log in again.");
            return;
        }

        if (!file) {
            console.error("No file selected.");
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
                const backendUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:5000";
                updatedUser.profileImageUrl = `${backendUrl}${updatedUser.profileImageUrl}`;
            }

            if (updateUser) updateUser(updatedUser);
            setIsEditingProfileImage(false);
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (!user) {
        return (
            <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <h3 className="text-4xl font-extrabold text-white">
                    Loading your HealthCure Dashboard...
                </h3>
                <p className="text-gray-300">Please wait while we fetch your personalized data.</p>
            </div>
        );
    }

    return (
    <section
        id="dashboard"
        className="relative pt-20 min-h-screen px-4 md:px-10 lg:px-20 mb-20 text-center text-white overflow-hidden"
    >
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full animate-pulse delay-2000" />
        </div>

        {/* User Profile Section */}
        <UserProfileSection
            user={user}
            uploading={uploading}
            isEditing={isEditingProfileImage}
            setIsEditing={setIsEditingProfileImage}
            handleImageUpload={handleImageUpload}
        />

        <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-md md:text-lg">
            ✨ Here are your{" "}
            <span className="text-blue-400 font-semibold">latest health metrics</span> and{" "}
            <span className="text-cyan-300 font-semibold">history</span>, guiding you towards a healthier life.
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