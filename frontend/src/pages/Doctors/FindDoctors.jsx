import React, { useCallback, useState, useEffect } from "react"; // Added useEffect
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import useDoctorSearch from './useDoctorSearch';
import FilterPanel from './FilterPanel';
import DoctorList from './DoctorList';
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaGlobe,
  FaFilter,
  FaTimes,
  FaMapMarkedAlt,
  FaSpinner,
} from "react-icons/fa";



const libraries = ["places"];

// Default location (e.g., center of India)
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; 

const FindDoctors = () => {
  const {
    filteredDoctors,
    cities,
    states,
    specializations,
    appliedCity,
    appliedState,
    appliedSpecialization,
    search,
    setSearch,
    tempCity,
    setTempCity,
    tempState,
    setTempState,
    tempSpecialization,
    setTempSpecialization,
    showFilters,
    setShowFilters,
    selectedDoctor,
    setSelectedDoctor,
    mapCenter,
    setMapCenter,
    loading,
    directionsUrl,
    getDirectionsToDoctor,
    handleApplyFilters,
    handleOpenFilters,
    handleResetTempFilters,
    resetAllFilters,
    findNearbyDoctors, // Assumes this new function is available in useDoctorSearch
  } = useDoctorSearch();

  const [showMap, setShowMap] = useState(false); 
  const [mapType, setMapType] = useState("roadmap");
  const [searchBox, setSearchBox] = useState(null); 
  
  // *** NEW STATE: To store the user's current location ***
  const [userLocation, setUserLocation] = useState(null); 
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // --- Geolocation Logic ---
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userPos);
        setMapCenter(userPos);
        setLocationLoading(false);
      },
      (error) => {
        console.error("Geolocation Error:", error);
        setLocationError("Unable to retrieve your location.");
        setMapCenter(defaultCenter);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [setMapCenter]);

  // --- Initial Location Fetch ---
  useEffect(() => {
    if (isLoaded && !userLocation) {
        getUserLocation();
    }
  }, [isLoaded, userLocation, getUserLocation]);


  // Map Search Handlers
  const onLoad = useCallback((ref) => { setSearchBox(ref); }, []);
  
  const onPlacesChanged = () => {
    if (searchBox && searchBox.getPlaces().length > 0) {
      const place = searchBox.getPlaces()[0];
      const newCenter = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      setMapCenter(newCenter);
      setShowMap(true); 
    }
  };
  
  const handleMapSearch = () => { 
    if (searchBox) onPlacesChanged(); 
    document.getElementById('map-container')?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCardMapClick = (doc) => {
    setSelectedDoctor(doc);
    setMapCenter({ lat: doc.lat, lng: doc.lng });
    setShowMap(true); 
    document.getElementById('map-container')?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDirectionsClick = (destLat, destLng) => {
    if (userLocation) {
      // Pass the user's current location as the origin
      getDirectionsToDoctor(userLocation.lat, userLocation.lng, destLat, destLng);
      setShowMap(true); 
      document.getElementById('map-container')?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Please allow location access to get directions.");
      getUserLocation();
    }
  };
  
  // --- RENDER ---
  return (
    <div className="min-h-screen bg-teal-100 p-4 md:p-8 overflow-y-auto"> 
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-6">
        🩺 Find Doctors
      </h2>

      {/* Location/Error Feedback */}
      {(locationLoading || locationError) && (
          <div className="text-center text-sm text-gray-500 mb-4">
              {locationLoading ? (
                  <span className="flex items-center justify-center"><FaSpinner className="animate-spin mr-2" /> Finding your location...</span>
              ) : (
                  <span className="text-red-500">{locationError}</span>
              )}
          </div>
      )}


      {/* Main Search Bar and Buttons */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        
        {/* General Search Input */}
        <div className="relative w-full md:w-1/2 flex-grow">
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor name, specialty, city, or state..."
            className="p-3 pl-10 border rounded-lg w-full bg-white shadow-sm focus:ring-teal-500 focus:border-teal-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={handleOpenFilters}
          className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md w-full md:w-auto"
        >
          <FaFilter /> Filters
        </button>

        {/* View on Map Button (Triggers Nearby Search) */}
        <button
          onClick={() => {
            if (userLocation) {
                // *** NEW LOGIC: Use the user location to find nearby doctors ***
                findNearbyDoctors(userLocation.lat, userLocation.lng); 
            } else {
                getUserLocation();
            }
            setShowMap(true);
            document.getElementById('map-container')?.scrollIntoView({ behavior: "smooth" });
          }}
          // Disable if location is currently loading
          disabled={locationLoading} 
          className={`flex items-center justify-center gap-2 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md w-full md:w-auto ${
            locationLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <FaMapMarkedAlt /> View Nearby Doctors
        </button>

        {/* Reset Button - COLOR CHANGED */}
        <button
          onClick={resetAllFilters}
          className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md w-full md:w-auto"
        >
          <FaTimes /> Reset All
        </button>
      </div>
      
      {/* Active Filters Display */}
      {(appliedState || appliedCity || appliedSpecialization) && (
        <div className="text-center text-sm text-gray-600 mb-4">
          Active Filters: {appliedState && <span className="mx-2 p-1 bg-teal-100 rounded">State: {appliedState}</span>}
          {appliedCity && <span className="mx-2 p-1 bg-teal-100 rounded">City: {appliedCity}</span>}
          {appliedSpecialization && <span className="mx-2 p-1 bg-teal-100 rounded">Specialty: {appliedSpecialization}</span>}
        </div>
      )}

      {/* Filter Modal/Panel */}
      {showFilters && (
        <FilterPanel 
          states={states}
          cities={cities}
          specializations={specializations}
          tempState={tempState}
          setTempState={setTempState}
          tempCity={tempCity}
          setTempCity={setTempCity}
          tempSpecialization={tempSpecialization}
          setTempSpecialization={setTempSpecialization}
          onApply={handleApplyFilters}
          onClose={() => setShowFilters(false)}
          onResetTemp={handleResetTempFilters}
        />
      )}

      {/* Doctor Cards List */}
      <DoctorList 
        doctors={filteredDoctors} 
        loading={loading} 
        onMapClick={handleCardMapClick} 
        onDirectionsClick={handleDirectionsClick} 
      />

      {/* --- MAP SECTION (CONDITIONAL RENDERING) --- */}
      {showMap && (
        <div id="map-container">
            {/* MAP SEARCH BAR */}
            <div className="w-full mb-6 mt-8"> 
              {isLoaded && (
                  <StandaloneSearchBox
                      onLoad={onLoad}
                      onPlacesChanged={onPlacesChanged}
                  >
                      <div className="flex justify-center max-w-xl mx-auto">
                          <input
                              type="text"
                              placeholder="Search a location on the map (e.g., 'Eiffel Tower')"
                              className="p-3 border rounded-l-lg shadow-md w-full focus:ring-cyan-500 focus:border-cyan-500"
                          />
                          <button 
                              onClick={handleMapSearch}
                              className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-r-lg shadow-md"
                          >
                              <FaSearch />
                          </button>
                      </div>
                  </StandaloneSearchBox>
              )}
            </div>
            {/* END MAP SEARCH BAR */}

            {/* Map Display */}
            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-md border relative">
              {isLoaded ? (
                // SCROLLABLE MAP: The inner div for the map container
                <div className="w-full h-full overflow-y-scroll"> 
                  
                  {/* Directions Link Display */}
                  {directionsUrl && (
                    <a 
                      href={directionsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-800 font-bold px-4 py-2 rounded-lg shadow-lg z-10 hover:bg-yellow-500 transition-colors"
                    >
                      View Directions on Google Maps 🗺️
                    </a>
                  )}

                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={mapCenter || defaultCenter} // Use mapCenter or default
                    zoom={selectedDoctor ? 15 : 12}
                    mapTypeId={mapType}
                  >
                    {/* User Location Marker */}
                    {userLocation && (
                        <Marker 
                            position={userLocation} 
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue pin for user
                                scaledSize: new window.google.maps.Size(35, 35)
                            }}
                            title="Your Location"
                        />
                    )}

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
                        position={{ lat: selectedDoctor.lat, lng: selectedDoctor.lng }}
                        onCloseClick={() => setSelectedDoctor(null)}
                      >
                        <div className="text-sm text-gray-700">
                          <h3 className="font-semibold text-cyan-600">
                            {selectedDoctor.name}
                          </h3>
                          <p>{selectedDoctor.specialization}</p>
                          <p>Exp: {selectedDoctor.experience} yrs | Gender: {selectedDoctor.gender}</p>
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

                  {/* Map Type Toggle */}
                  <div
                    className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md flex items-center gap-2 cursor-pointer z-10"
                    onClick={() =>
                      setMapType((prev) => (prev === "roadmap" ? "satellite" : "roadmap"))
                    }
                  >
                    <FaGlobe className="text-blue-500" /> 
                    <span className="text-sm font-medium">
                      {mapType === "roadmap" ? "Satellite View" : "Map View"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <FaSpinner className="animate-spin text-blue-500 text-3xl mr-2" />
                  Loading Map...
                </div>
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default FindDoctors;