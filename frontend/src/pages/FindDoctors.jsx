import React, { useState, useEffect } from "react";
import API from "../utils/Api";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaSatelliteDish,
  FaGraduationCap,
  FaVenusMars,
  FaUniversity,
} from "react-icons/fa";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.8777 }); // Default: Mumbai
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapType, setMapType] = useState("roadmap");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  // Fetch available cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await API.get("/search/filters");
        setCities(res.data.cities);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  // Fetch doctors by city
  const fetchDoctorsByCity = async (selectedCity) => {
    if (!selectedCity) return;
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/search/doctors", {
        params: { city: selectedCity },
      });
      setDoctors(res.data);

      const first = res.data.find((d) => d.lat && d.lng);
      if (first) setMapCenter({ lat: first.lat, lng: first.lng });
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("No doctors found in this city.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchDoctorsByCity(city);
  }, [city]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 p-5 overflow-y-auto bg-white border-r shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          🩺 Find Doctors
        </h2>

        {/* City Dropdown */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
        >
          <option value="">Select a City</option>
          {cities.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        {loading && <p className="text-gray-500 text-center">Loading doctors...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Doctor Cards */}
        <div className="space-y-4">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 shadow hover:shadow-lg transition-all duration-200 rounded-2xl p-4 flex items-start gap-4 cursor-pointer"
              onClick={() => {
                if (doc.lat && doc.lng) {
                  setSelectedDoctor(doc);
                  setMapCenter({ lat: doc.lat, lng: doc.lng });
                }
              }}
            >
              {/* Profile Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserMd className="text-blue-500 text-2xl" />
                </div>
              </div>

              {/* Doctor Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                <p className="text-sm text-blue-600 font-medium">
                  {doc.specialization || "General Practitioner"}
                </p>

                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  {doc.education && (
                    <p className="flex items-center gap-2">
                      <FaGraduationCap className="text-indigo-500" />
                      <span>{doc.education}</span>
                    </p>
                  )}
                  {doc.institute && (
                    <p className="flex items-center gap-2">
                      <FaUniversity className="text-orange-500" />
                      <span>{doc.institute}</span>
                    </p>
                  )}
                  {doc.gender && (
                    <p className="flex items-center gap-2">
                      <FaVenusMars className="text-pink-500" />
                      <span className="capitalize">{doc.gender}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>{doc.address || "Address not available"}</span>
                  </p>
                  {doc.phone && (
                    <p className="flex items-center gap-2">
                      <FaPhoneAlt className="text-green-500" />
                      <span>{doc.phone}</span>
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  <button
                    className={`text-sm px-3 py-1 rounded-lg transition-all ${
                      doc.phone
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={() => doc.phone && window.open(`tel:${doc.phone}`, "_self")}
                    disabled={!doc.phone}
                  >
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Map */}
      <div className="flex-1 h-full relative">
        {isLoaded ? (
          <>
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={mapCenter}
              zoom={selectedDoctor ? 15 : 13}
              mapTypeId={mapType}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {doctors
                .filter((d) => d.lat && d.lng)
                .map((d, idx) => (
                  <Marker
                    key={idx}
                    position={{ lat: d.lat, lng: d.lng }}
                    onClick={() => {
                      setSelectedDoctor(d);
                      setMapCenter({ lat: d.lat, lng: d.lng });
                    }}
                    animation={
                      selectedDoctor && selectedDoctor._id === d._id
                        ? google.maps.Animation.BOUNCE
                        : null
                    }
                  />
                ))}

              {/* InfoWindow for Selected Doctor */}
              {selectedDoctor && (
                <InfoWindow
                  position={{
                    lat: selectedDoctor.lat,
                    lng: selectedDoctor.lng,
                  }}
                  onCloseClick={() => setSelectedDoctor(null)}
                >
                  <div className="p-2 text-gray-800 max-w-[200px]">
                    <h3 className="font-semibold text-blue-600">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedDoctor.specialization || "General Practitioner"}
                    </p>
                    {selectedDoctor.education && (
                      <p className="text-xs mt-1">{selectedDoctor.education}</p>
                    )}
                    {selectedDoctor.institute && (
                      <p className="text-xs text-gray-600">
                        {selectedDoctor.institute}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedDoctor.address}
                    </p>
                    {selectedDoctor.phone && (
                      <a
                        href={`tel:${selectedDoctor.phone}`}
                        className="text-blue-500 text-sm font-medium mt-2 block"
                      >
                        📞 {selectedDoctor.phone}
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>

            {/* Map Type Toggle Button */}
            <div className="absolute top-4 right-4 flex flex-col gap-3 items-end z-10">
              <button
                className="bg-white shadow-md px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-100"
                onClick={() =>
                  setMapType((prev) =>
                    prev === "roadmap" ? "satellite" : "roadmap"
                  )
                }
              >
                <FaSatelliteDish className="text-blue-500" />
                {mapType === "roadmap" ? "Satellite View" : "Map View"}
              </button>

              {/* Zoom buttons fixed and visible */}
              <div className="flex flex-col gap-2 bg-white p-2 rounded-xl shadow-md">
                <button
                  className="text-lg font-bold text-gray-600 hover:text-blue-600"
                  onClick={() => window.mapRef?.setZoom(window.mapRef.getZoom() + 1)}
                >
                  ＋
                </button>
                <button
                  className="text-lg font-bold text-gray-600 hover:text-blue-600"
                  onClick={() => window.mapRef?.setZoom(window.mapRef.getZoom() - 1)}
                >
                  －
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading Map...
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
