import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const defaultCenter = {
  lat: 28.7041,
  lng: 77.1025
};

const FindDoctors = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Load Google Maps script with API key
  const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY // Use the environment variable
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
          console.error("Geolocation error:", err);
          setError("Failed to get your location. Displaying a default map.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const fetchDoctors = async (query, location = userLocation) => {
    setLoading(true);
    setError(null);
    try {
      let url = `http://localhost:5000/api/search/doctors?query=${encodeURIComponent(query)}`;
      if (location) {
        url += `&lat=${location.lat}&lng=${location.lng}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch doctors");
      }

      setMarkers(data);
      if (data.length > 0) {
        setMapCenter({ lat: data[0].lat, lng: data[0].lng });
      } else {
        setError("No doctors found for this search.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      fetchDoctors(searchQuery);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <div style={styles.container}>
      <h1 style={styles.heading}>Find Doctors and Medical Facilities ⚕️</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for doctors, hospitals, dentists, etc."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>
      {loading && <p style={styles.message}>Loading...</p>}
      {error && <p style={styles.errorText}>Error: {error}</p>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
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
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindowF
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleCloseClick}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>Address: {selectedMarker.address}</p>
              <p>Category: {selectedMarker.category}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div style={styles.loadingContainer}>
      <p style={styles.loadingMessage}>Loading Google Maps...</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f9',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '12px 20px',
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  message: {
    textAlign: 'center',
    color: '#555',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7f9',
  },
  loadingMessage: {
    color: '#555',
    fontSize: '18px',
  },
};

export default FindDoctors;