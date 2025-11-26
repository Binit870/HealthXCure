import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaBriefcase,
  FaVenusMars,
  FaCity,
  FaGlobeAmericas,
  FaTimes,
} from "react-icons/fa";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "350px" };
const libraries = ["places"];

const DoctorCard = ({ doc }) => {
  const [showModal, setShowModal] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <>
      <div className="bg-white shadow-xl rounded-2xl border p-6 hover:shadow-2xl transition-all duration-300 w-full flex flex-col flex-1">


        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUserMd className="text-teal-500 text-4xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{doc.name}</h3>
            <p className="text-teal-600 text-base">
              {doc.specialization || "General Practitioner"}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-4 text-sm text-gray-700 space-y-2 border-t pt-3 flex-1">
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-purple-500 text-lg" />
            <span className="font-medium">Experience:</span> {doc.experience} years
          </p>

          <p className="flex items-center gap-2">
            <FaVenusMars className="text-pink-500 text-lg" />
            <span className="font-medium">Gender:</span> {doc.gender || "N/A"}
          </p>

          {doc.address && (
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-cyan-500 text-lg mt-1 shrink-0" />
              <p className="break-words">
                <span className="font-medium mr-1">Address:</span>
                {doc.address || "No address"}
              </p>
            </div>
          )}

          {doc.city && (
            <p className="flex items-center gap-2">
              <FaCity className="text-blue-500 text-lg" />
              <span className="font-medium">City:</span> {doc.city}
            </p>
          )}

          {doc.state && (
            <p className="flex items-center gap-2">
              <FaGlobeAmericas className="text-indigo-500 text-lg" />
              <span className="font-medium">State:</span> {doc.state}
            </p>
          )}

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
              onClick={() => setShowModal(true)}
            >
              View on Map
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {doc.name} — Location
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800 p-2 rounded"
                aria-label="Close map"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4">
              {!isLoaded ? (
                <div className="flex items-center justify-center h-72 text-gray-500">
                  Loading map...
                </div>
              ) : (
                <div style={{ width: "100%", height: 350 }}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: doc.lat, lng: doc.lng }}
                    zoom={15}
                  >
                    <Marker position={{ lat: doc.lat, lng: doc.lng }} />
                  </GoogleMap>
                </div>
              )}

              <div className="mt-3 text-sm text-gray-700">
                {doc.address && <p className="font-medium">Address: {doc.address}</p>}
                {doc.city && <p>City: {doc.city}</p>}
                {doc.state && <p>State: {doc.state}</p>}
                {doc.phone && (
                  <p>
                    Phone:{" "}
                    <a href={`tel:${doc.phone}`} className="text-blue-500">
                      {doc.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorCard;
