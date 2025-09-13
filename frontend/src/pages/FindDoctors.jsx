import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa';
import API from '../utils/Api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 28.7041, // Default to New Delhi, India
  lng: 77.1025,
};

const FindDoctors = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // ✅ Load Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const location = { lat: userLat, lng: userLng };
          setUserLocation(location);
          setMapCenter(location);
          fetchDoctors('doctors', location);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Failed to get your location. Displaying a default map.');
          fetchDoctors('doctors', defaultCenter);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Displaying a default map.');
      fetchDoctors('doctors', defaultCenter);
    }
  }, []);

  // Fetch doctors from backend
  const fetchDoctors = async (query, location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/search/doctors', {
        params: {
          query: query,
          lat: location.lat,
          lng: location.lng,
        },
      });

      const data = response.data;
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format from server.');
      }

      setMarkers(data);
      if (data.length > 0) {
        setMapCenter({ lat: data[0].lat, lng: data[0].lng });
      } else {
        setError('No doctors found for this search.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch doctors from server.');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchLocation = userLocation || mapCenter;
      fetchDoctors(searchQuery, searchLocation);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <div className="bg-gray-900 text-white min-h-screen pt-20 pb-10 px-4 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-4">
          Find Doctors and Medical Facilities ⚕️
        </h1>
        <p className="text-gray-300 text-center text-lg mb-8">
          Search for professionals near you and see them on the map.
        </p>
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="relative w-full md:w-auto flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for doctors, hospitals, etc."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Search
          </button>
        </form>

        {loading && (
          <div className="text-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading...</p>
          </div>
        )}
        {error && <p className="text-center text-red-500 my-4">{error}</p>}

        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
            {/* User location marker */}
            {userLocation && (
              <MarkerF
                position={userLocation}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#007bff',
                  fillOpacity: 1,
                  strokeColor: '#fff',
                  strokeWeight: 2,
                }}
              />
            )}

            {/* Doctor markers */}
            {markers.map((marker, index) => (
              <MarkerF
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {/* Info window */}
            {selectedMarker && (
              <InfoWindowF
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={handleCloseClick}
              >
                <div className="text-black p-2">
                  <h3 className="font-bold text-lg">{selectedMarker.name}</h3>
                  <p className="text-sm">Address: {selectedMarker.address}</p>
                  <p className="text-sm">Category: {selectedMarker.category}</p>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
      <p className="text-xl font-semibold">Loading Google Maps...</p>
    </div>
  );
};

export default FindDoctors;
