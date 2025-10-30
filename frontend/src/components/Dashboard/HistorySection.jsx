import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HistorySection = ({ title, icon: Icon, historyData, emptyMessage, showViewAll }) => {
    const navigate = useNavigate();

    // ✅ Redirects to correct route based on section type
    const handleViewAll = () => {
        if (title === 'Diet History') navigate('/diet');
        else if (title === 'Symptom History') navigate('/symptom');
        else if (title === 'Report History') navigate('/report');
    };

    const renderHistoryItem = (item, index) => {
        switch (title) {
            case 'Diet History':
                return (
                    <div key={index}>
                        <p className="text-sm font-semibold text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}:
                        </p>
                        <p className="text-lg text-teal-600 whitespace-pre-line text-left">
                            {item.plan}
                        </p>
                    </div>
                );
            case 'Symptom History':
                return (
                    <div key={index}>
                        <p className="text-sm font-semibold text-gray-500">{item.date}:</p>
                        <p className="text-lg text-gray-800 text-left">
                            {item.symptom} - Severity:{" "}
                            <span className="font-bold text-red-500">{item.severity}</span>
                        </p>
                    </div>
                );
            case 'Report History':
                return (
                    <div key={index}>
                        <p className="text-sm font-semibold text-gray-500">{item.date}:</p>
                        <p className="text-lg text-gray-800 text-left">{item.name}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderActionLink = (item) => {
        if (title === 'Report History' && item.fileUrl) {
            return (
                <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:text-teal-600 transition-colors duration-200 font-semibold px-4 py-2 rounded-full border border-teal-300 hover:border-teal-400 text-sm whitespace-nowrap"
                >
                    View/Download
                </a>
            );
        }
        return null;
    };

    return (
        <div className="rounded-3xl p-8 shadow-lg bg-white border border-lavender-100 transition-shadow duration-300 hover:shadow-xl text-left">
            <h4 className="text-2xl font-bold mb-6 text-teal-700 flex items-center">
                <Icon className="mr-4 text-3xl text-teal-500" /> {title}
            </h4>

            {historyData.length > 0 ? (
                <ul className="space-y-4 text-gray-800">
                    {historyData.map((item, index) => (
                        <li
                            key={index}
                            className="border-t border-gray-200 pt-4 flex justify-between items-center hover:bg-lavender-50/50 p-3 rounded-xl transition-colors duration-200"
                        >
                            {renderHistoryItem(item, index)}
                            {renderActionLink(item)}
                        </li>
                    ))}

                    {/* ✅ Button to view full section */}
                    {showViewAll && (
                        <li className="pt-4 text-center">
                            <button
                                onClick={handleViewAll}
                                className="text-indigo-500 hover:text-indigo-700 font-semibold flex items-center justify-center mx-auto transition-colors duration-200"
                            >
                                View {title.replace(" History", "")} <FaArrowRight className="ml-2 text-sm" />
                            </button>
                        </li>
                    )}
                </ul>
            ) : (
                <p className="text-gray-500 text-lg">{emptyMessage}</p>
            )}
        </div>
    );
};

export default HistorySection;
