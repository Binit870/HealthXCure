import React from 'react';
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaBriefcase,
  FaVenusMars,
  FaCity,
  FaGlobeAmericas,
} from "react-icons/fa";

const DoctorCard = ({ doc, onMapClick, onDirectionsClick }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl border p-6 hover:shadow-2xl transition-all duration-300 w-full max-w-[520px] min-w-[400px] mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
          <FaUserMd className="text-teal-500 text-4xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {doc.name}
          </h3>
          <p className="text-teal-600 text-base">
            {doc.specialization || "General Practitioner"}
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-4 text-sm text-gray-700 space-y-2 border-t pt-3">
        <p className="flex items-center gap-2">
          <FaBriefcase className="text-purple-500 text-lg" />
          <span className="font-medium">Experience:</span> {doc.experience} years
        </p>

        <p className="flex items-center gap-2">
          <FaVenusMars className="text-pink-500 text-lg" />
          <span className="font-medium">Gender:</span> {doc.gender || "N/A"}
        </p>

        {/* *** FINAL FIX: Combining label and value into a single paragraph element. *** */}
        {doc.address && (
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-cyan-500 text-lg mt-1 shrink-0" />
            <p className="break-words">
              <span className="font-medium mr-1">Address:</span>
              {doc.address || "No address"}
            </p>
          </div>
        )}
        
        {/* City Line */}
        {doc.city && (
          <p className="flex items-center gap-2">
            <FaCity className="text-blue-500 text-lg" />
            <span className="font-medium">City:</span> {doc.city}
          </p>
        )}
        
        {/* State Line */}
        {doc.state && (
          <p className="flex items-center gap-2">
            <FaGlobeAmericas className="text-indigo-500 text-lg" />
            <span className="font-medium">State:</span> {doc.state}
          </p>
        )}

        {/* Phone Line */}
        {doc.phone && (
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-500 text-lg" />
            <span className="font-medium">Phone:</span> {doc.phone}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        {doc.phone && (
          <button
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl text-sm font-medium"
            onClick={() => window.open(`tel:${doc.phone}`, "_self")}
          >
            Call Now
          </button>
        )}
        
        {doc.lat && doc.lng && (
          <button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-medium"
            onClick={() => onDirectionsClick(doc.lat, doc.lng)}
          >
            Get Directions
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;