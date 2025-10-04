import React from 'react';

const HistorySection = ({ title, icon: Icon, historyData, emptyMessage }) => {
  const renderHistoryItem = (item, index) => {
    switch (title) {
      case 'Diet History':
        return (
          <div key={index}>
            <p className="text-sm font-semibold">
              {new Date(item.createdAt).toLocaleDateString()}:
            </p>
            <p className="text-lg text-yellow-300 whitespace-pre-line">
              {item.plan}
            </p>
          </div>
        );
      case 'Symptom History':
        return (
          <div key={index}>
            <p className="text-sm font-semibold">{item.date}:</p>
            <p className="text-lg">
              {item.symptom} - Severity:{" "}
              <span className="font-bold text-red-400">{item.severity}</span>
            </p>
          </div>
        );
      case 'Report History':
        return (
          <div key={index}>
            <p className="text-sm font-semibold">{item.date}:</p>
            <p className="text-lg">{item.name}</p>
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
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold px-4 py-2 rounded-lg border border-blue-400 hover:border-blue-300"
        >
          View/Download
        </a>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl p-8 shadow-xl bg-gradient-to-br from-gray-700 to-gray-800 transition-shadow duration-300 hover:shadow-2xl">
      <h4 className="text-2xl font-bold mb-6 text-white flex items-center">
        <Icon className="mr-4 text-3xl" /> {title}
      </h4>
      {historyData.length > 0 ? (
        <ul className="space-y-4 text-gray-200">
          {historyData.map((item, index) => (
            <li
              key={index}
              className="border-t border-gray-600 pt-4 flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
            >
              {renderHistoryItem(item, index)}
              {renderActionLink(item)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      )}
    </div>
  );
};


export default HistorySection;