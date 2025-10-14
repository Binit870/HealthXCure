import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import API from "../utils/Api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 28.7041,
  lng: 77.1025,
};

const FindDoctors = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          fetchDoctors("", "", location);
        },
        () => {
          fetchDoctors("", "", defaultCenter);
        }
      );
    } else {
      fetchDoctors("", "", defaultCenter);
    }
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await API.get("/search/filters");
        setCities(response.data.cities || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  const fetchDoctors = async (name, city, location) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (name) params.name = name;
      if (city) params.city = city;

      const res = await API.get("/search/doctors", { params });
      const data = Array.isArray(res.data) ? res.data : [];

      const validMarkers = data.filter((doc) => doc.lat && doc.lng);
      setMarkers(validMarkers);

      if (validMarkers.length > 0) {
        setMapCenter({ lat: validMarkers[0].lat, lng: validMarkers[0].lng });
      } else {
        setError("No doctors found.");
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const loc = userLocation || mapCenter;
    fetchDoctors(searchQuery, selectedCity, loc);
  };

  const handleMarkerClick = (marker) => setSelectedMarker(marker);
  const handleCloseClick = () => setSelectedMarker(null);

  return isLoaded ? (
    <div className="bg-gray-900 text-white min-h-screen pt-20 pb-10 px-4 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-4">
          Find Doctors ⚕️
        </h1>

        {/* Search & City Filter */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-full text-black"
          />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 rounded-full text-black"
          >
            <option value="">All Cities</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>
          <button type="submit" className="px-6 py-2 bg-cyan-600 rounded-full hover:bg-cyan-700">
            Search
          </button>
        </form>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {markers.map((doc) => (
            <div key={doc._id || doc.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-1">{doc.name}</h2>
              <p className="text-gray-300 mb-1">City: {doc.city}</p>
              <p className="text-gray-300 mb-1">Education: {doc.education}</p>
              <p className="text-gray-300 mb-1">Address: {doc.address}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
            {userLocation && (
              <MarkerF
                position={userLocation}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#007bff",
                  fillOpacity: 1,
                  strokeColor: "#fff",
                  strokeWeight: 2,
                }}
              />
            )}

            {markers.map((marker, i) => (
              <MarkerF
                key={i}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {selectedMarker && (
              <InfoWindowF
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={handleCloseClick}
              >
                <div className="text-black p-2">
                  <h3 className="font-bold">{selectedMarker.name}</h3>
                  <p>City: {selectedMarker.city}</p>
                  <p>Education: {selectedMarker.education}</p>
                  <p>Address: {selectedMarker.address}</p>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>

        {loading && <p className="text-center mt-4 text-gray-300">Loading doctors...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  ) : (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <p>Loading Google Maps...</p>
    </div>
  );
};

export default FindDoctors;
