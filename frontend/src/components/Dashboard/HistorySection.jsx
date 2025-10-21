import React from 'react';

const HistorySection = ({ title, icon: Icon, historyData, emptyMessage }) => {
  const renderHistoryItem = (item, index) => {
    switch (title) {
      case 'Diet History':
        return (
          <div key={index}>
            <p className="text-sm font-semibold text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}:
            </p>
            {/* Color changed to Teal/Mint for a "fresh" feeling */}
            <p className="text-lg text-teal-600 whitespace-pre-line">
              {item.plan}
            </p>
          </div>
        );
      case 'Symptom History':
        return (
          <div key={index}>
            <p className="text-sm font-semibold text-gray-500">{item.date}:</p>
            <p className="text-lg text-gray-800">
              {item.symptom} - Severity:{" "}
              {/* Severity color adjusted for a lighter theme */}
              <span className="font-bold text-red-500">{item.severity}</span>
            </p>
          </div>
        );
      case 'Report History':
        return (
          <div key={index}>
            <p className="text-sm font-semibold text-gray-500">{item.date}:</p>
            <p className="text-lg text-gray-800">{item.name}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderActionLink = (item) => {
    if (title === 'Report History') {
      return (
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          // Link color changed to Teal-500 for a cohesive look
          className="text-teal-500 hover:text-teal-600 transition-colors duration-200 font-semibold px-4 py-2 rounded-full border border-teal-300 hover:border-teal-400 text-sm"
        >
          View/Download
        </a>
      );
    }
    return null;
  };

  return (
    // Redesigned card: White background, subtle shadow, light border accent
    <div className="rounded-3xl p-8 shadow-lg bg-white border border-lavender-100 transition-shadow duration-300 hover:shadow-xl">
      <h4 className="text-2xl font-bold mb-6 text-teal-700 flex items-center">
        {/* Icon color changed to Teal-500 */}
        <Icon className="mr-4 text-3xl text-teal-500" /> {title}
      </h4>
      {historyData.length > 0 ? (
        <ul className="space-y-4 text-gray-800">
          {historyData.map((item, index) => (
            <li
              key={index}
              // Separator is light gray
              className="border-t border-gray-200 pt-4 flex justify-between items-center hover:bg-lavender-50/50 p-3 rounded-xl transition-colors duration-200"
            >
              {renderHistoryItem(item, index)}
              {renderActionLink(item)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      )}
    </div>
  );
};


export default HistorySection;