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
  FaGraduationCap,
  FaUniversity,
  FaVenusMars,
  FaSearch,
  FaSatelliteDish,
  FaMapMarkedAlt,
} from "react-icons/fa";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.8777 });
  const [loading, setLoading] = useState(false);
  const [mapType, setMapType] = useState("roadmap");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  // 🏙 Fetch all cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await API.get("/search/filters");
        setCities(res.data.cities || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  // 🩺 Fetch all doctors initially
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await API.get("/search/doctors");
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // 🔍 Filter doctors by name and city
  useEffect(() => {
    let filtered = doctors;
    if (city)
      filtered = filtered.filter(
        (doc) => doc.city?.toLowerCase() === city.toLowerCase()
      );
    if (search)
      filtered = filtered.filter(
        (doc) =>
          doc.name?.toLowerCase().includes(search.toLowerCase()) ||
          doc.specialization?.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredDoctors(filtered);
  }, [city, search, doctors]);

  // 📍 Find nearby doctors using user's location
  const findNearby = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapCenter({ lat: latitude, lng: longitude });

        // Filter doctors within ~10km radius
        const nearby = doctors.filter((doc) => {
          if (!doc.lat || !doc.lng) return false;
          const R = 6371; // Radius of Earth (km)
          const dLat = (doc.lat - latitude) * (Math.PI / 180);
          const dLng = (doc.lng - longitude) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(latitude * (Math.PI / 180)) *
              Math.cos(doc.lat * (Math.PI / 180)) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance <= 10; // within 10 km
        });

        setFilteredDoctors(nearby);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Unable to get your location.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        🩺 Find Doctors & Clinics
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/4 bg-white"
        >
          <option value="">All Cities</option>
          {cities.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, specialization..."
            className="p-3 pl-10 border rounded-lg w-full bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={findNearby}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md"
        >
          <FaMapMarkedAlt /> Find on Map
        </button>
      </div>

      {/* Doctor Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading doctors...</p>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl border p-5 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserMd className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-blue-600 text-sm">
                    {doc.specialization || "General Practitioner"}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                {doc.education && (
                  <p className="flex items-center gap-2">
                    <FaGraduationCap className="text-indigo-500" />
                    {doc.education}
                  </p>
                )}
                {doc.institute && (
                  <p className="flex items-center gap-2">
                    <FaUniversity className="text-orange-500" />
                    {doc.institute}
                  </p>
                )}
                {doc.gender && (
                  <p className="flex items-center gap-2">
                    <FaVenusMars className="text-pink-500" />
                    {doc.gender}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  {doc.address || "No address"}
                </p>
                {doc.phone && (
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-green-500" /> {doc.phone}
                  </p>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                {doc.phone && (
                  <button
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => window.open(`tel:${doc.phone}`, "_self")}
                  >
                    Call Now
                  </button>
                )}
                {doc.lat && doc.lng && (
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setMapCenter({ lat: doc.lat, lng: doc.lng });
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      });
                    }}
                  >
                    View on Map
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No doctors found.</p>
      )}

      {/* 🗺 Map Section */}
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-md border relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={selectedDoctor ? 15 : 12}
            mapTypeId={mapType}
          >
            {filteredDoctors
              .filter((d) => d.lat && d.lng)
              .map((d, idx) => (
                <Marker
                  key={idx}
                  position={{ lat: d.lat, lng: d.lng }}
                  onClick={() => {
                    setSelectedDoctor(d);
                    setMapCenter({ lat: d.lat, lng: d.lng });
                  }}
                />
              ))}

            {selectedDoctor && (
              <InfoWindow
                position={{
                  lat: selectedDoctor.lat,
                  lng: selectedDoctor.lng,
                }}
                onCloseClick={() => setSelectedDoctor(null)}
              >
                <div className="text-sm text-gray-700">
                  <h3 className="font-semibold text-blue-600">
                    {selectedDoctor.name}
                  </h3>
                  <p>{selectedDoctor.specialization}</p>
                  <p>{selectedDoctor.address}</p>
                  {selectedDoctor.phone && (
                    <a
                      href={`tel:${selectedDoctor.phone}`}
                      className="text-blue-500"
                    >
                      📞 {selectedDoctor.phone}
                    </a>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading Map...
          </div>
        )}

        {/* Map Type Toggle */}
        <div
          className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md flex items-center gap-2 cursor-pointer"
          onClick={() =>
            setMapType((prev) =>
              prev === "roadmap" ? "satellite" : "roadmap"
            )
          }
        >
          <FaSatelliteDish className="text-blue-500" />
          <span className="text-sm font-medium">
            {mapType === "roadmap" ? "Satellite View" : "Map View"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FindDoctors;
