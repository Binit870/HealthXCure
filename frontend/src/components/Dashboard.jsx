import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaRunning, FaBed, FaUtensils, FaTired, FaFileAlt, FaUserCircle, FaEdit } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios'; 

const Dashboard = () => {
    const { user, token, updateUser } = useAuth();
    
    const [heartRate, setHeartRate] = useState(72);
    const [steps, setSteps] = useState(8500);
    const [sleepScore, setSleepScore] = useState(92);
    const [dietHistory, setDietHistory] = useState([]);
    const [symptomHistory, setSymptomHistory] = useState([]);
    const [reportHistory, setReportHistory] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

    useEffect(() => {
        const fetchHealthData = async () => {
            if (user) {
                try {
                    // Simulating API calls for demonstration
                    // In a real app, replace these with actual API endpoints
                    // and ensure proper error handling and data parsing.
                    const healthResponse = { heartRate: 75, steps: 9200, sleepScore: 88 };
                    const dietResponse = [
                        { date: '2023-10-26', foodItem: 'Oats with Fruits', calories: 350 },
                        { date: '2023-10-25', foodItem: 'Chicken Salad', calories: 450 },
                        { date: '2023-10-24', foodItem: 'Dal Roti', calories: 500 }
                    ];
                    const symptomResponse = [
                        { date: '2023-10-26', symptom: 'Mild Headache', severity: 'Low' },
                        { date: '2023-10-23', symptom: 'Fatigue', severity: 'Medium' }
                    ];
                    const reportResponse = [
                        { date: '2023-09-15', name: 'Annual Checkup Report', fileUrl: '#' },
                        { date: '2023-07-20', name: 'Blood Test Results', fileUrl: '#' }
                    ];


                    setHeartRate(healthResponse.heartRate);
                    setSteps(healthResponse.steps);
                    setSleepScore(healthResponse.sleepScore);
                    setDietHistory(dietResponse);
                    setSymptomHistory(symptomResponse);
                    setReportHistory(reportResponse);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };

        const timer = setTimeout(() => {
            fetchHealthData();
        }, 500);

        return () => clearTimeout(timer);
    }, [user]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('profileImage', file);

            try {
                const response = await axios.post(`/api/user/${user.id}/profile-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, 
                    },
                });

                const updatedUser = response.data.user;
                if (updateUser) {
                    updateUser(updatedUser);
                }

                setIsEditingProfileImage(false);
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Failed to upload image. Please try again.");
            } finally {
                setUploading(false);
            }
        }
    };

    if (!user) {
        return (
            <div className="pt-20 flex flex-col items-center justify-center min-h-screen text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <h3 className="text-4xl font-extrabold text-white">Loading your HealthCure Dashboard...</h3>
                <p className="text-gray-300">Please wait while we fetch your personalized data.</p>
            </div>
        );
    }

    return (
        <section id="dashboard" className="pt-20 min-h-screen px-4 md:px-10 lg:px-20 rounded-3xl shadow-lg mb-20 text-center text-white">
            <div className="flex flex-col items-center justify-center mb-8">
                {/* Profile Picture Section */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-transparent bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-lg mb-4 transform transition-transform duration-300 hover:scale-105">
                    {user.profileImageUrl ? (
                        <img 
                            src={user.profileImageUrl} 
                            alt="User Profile" 
                            className="w-full h-full rounded-full object-cover border-2 border-white" 
                        />
                    ) : (
                        <FaUserCircle className="w-full h-full text-gray-300 rounded-full bg-gray-700 p-1" />
                    )}
                    <button 
                        onClick={() => setIsEditingProfileImage(!isEditingProfileImage)}
                        className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center text-lg"
                        aria-label="Edit profile picture"
                        disabled={uploading}
                    >
                        <FaEdit />
                    </button>
                    {isEditingProfileImage && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    )}
                </div>
                {uploading && <p className="text-sm text-blue-400 mt-2">Uploading...</p>}
                <h3 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">
                    Welcome back, {user.name}! 👋
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                    Your personalized health overview.
                </p>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-md md:text-lg">
                Here are your latest health metrics and history, guiding you towards a healthier life.
            </p>
            
            {/* Health Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
                <div className="rounded-3xl p-8 shadow-xl flex flex-col items-center text-center bg-gradient-to-br from-red-600 to-pink-700 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    <FaHeartbeat className="text-white text-5xl mb-4 animate-pulse" />
                    <h4 className="text-2xl font-bold mb-2 text-white">Heart Rate</h4>
                    <p className="text-white text-3xl font-extrabold">{heartRate} bpm</p>
                </div>
                <div className="rounded-3xl p-8 shadow-xl flex flex-col items-center text-center bg-gradient-to-br from-green-500 to-teal-600 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    <FaRunning className="text-white text-5xl mb-4" />
                    <h4 className="text-2xl font-bold mb-2 text-white">Steps Today</h4>
                    <p className="text-white text-3xl font-extrabold">{steps}</p>
                </div>
                <div className="rounded-3xl p-8 shadow-xl flex flex-col items-center text-center bg-gradient-to-br from-blue-500 to-indigo-600 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    <FaBed className="text-white text-5xl mb-4" />
                    <h4 className="text-2xl font-bold mb-2 text-white">Sleep Score</h4>
                    <p className="text-white text-3xl font-extrabold">{sleepScore}%</p>
                </div>
            </div>

            {/* History Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left max-w-6xl mx-auto">
                {/* Diet History Section */}
                <div className="rounded-3xl p-8 shadow-xl bg-gradient-to-br from-gray-700 to-gray-800 transition-shadow duration-300 hover:shadow-2xl">
                    <h4 className="text-2xl font-bold mb-6 text-white flex items-center">
                        <FaUtensils className="mr-4 text-blue-400 text-3xl" /> Diet History
                    </h4>
                    {dietHistory.length > 0 ? (
                        <ul className="space-y-4 text-gray-200">
                            {dietHistory.map((entry, index) => (
                                <li key={index} className="border-t border-gray-600 pt-4 flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                                    <div>
                                        <p className="text-sm font-semibold">{entry.date}:</p>
                                        <p className="text-lg">{entry.foodItem} - <span className="font-bold text-yellow-300">{entry.calories} kcal</span></p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-lg">No diet history recorded yet. Start tracking your meals!</p>
                    )}
                </div>

                {/* Symptom History Section */}
                <div className="rounded-3xl p-8 shadow-xl bg-gradient-to-br from-gray-700 to-gray-800 transition-shadow duration-300 hover:shadow-2xl">
                    <h4 className="text-2xl font-bold mb-6 text-white flex items-center">
                        <FaTired className="mr-4 text-pink-400 text-3xl" /> Symptom History
                    </h4>
                    {symptomHistory.length > 0 ? (
                        <ul className="space-y-4 text-gray-200">
                            {symptomHistory.map((entry, index) => (
                                <li key={index} className="border-t border-gray-600 pt-4 flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                                    <div>
                                        <p className="text-sm font-semibold">{entry.date}:</p>
                                        <p className="text-lg">{entry.symptom} - Severity: <span className="font-bold text-red-400">{entry.severity}</span></p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-lg">No symptom history recorded. Track your symptoms for better insights!</p>
                    )}
                </div>

                {/* Report History Section */}
                <div className="rounded-3xl p-8 shadow-xl bg-gradient-to-br from-gray-700 to-gray-800 lg:col-span-2 transition-shadow duration-300 hover:shadow-2xl">
                    <h4 className="text-2xl font-bold mb-6 text-white flex items-center">
                        <FaFileAlt className="mr-4 text-green-400 text-3xl" /> Report History
                    </h4>
                    {reportHistory.length > 0 ? (
                        <ul className="space-y-4 text-gray-200">
                            {reportHistory.map((report, index) => (
                                <li key={index} className="border-t border-gray-600 pt-4 flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                                    <div>
                                        <p className="text-sm font-semibold">{report.date}:</p>
                                        <p className="text-lg">{report.name}</p>
                                    </div>
                                    <a 
                                        href={report.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold px-4 py-2 rounded-lg border border-blue-400 hover:border-blue-300"
                                    >
                                        View/Download
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-lg">No reports available. Upload your health reports here.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;