import { useState, useEffect, useCallback } from "react";
import API from "../../utils/Api"; 

// Default center (Mumbai)
const defaultCenter = { lat: 19.076, lng: 72.8777 }; 

const useDoctorSearch = () => {
    // Data States
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    
    // Filter States
    const [appliedCity, setAppliedCity] = useState("");
    const [appliedState, setAppliedState] = useState("");
    const [appliedSpecialization, setAppliedSpecialization] = useState("");
    const [search, setSearch] = useState(""); 
    
    // UI States
    const [tempCity, setTempCity] = useState("");
    const [tempState, setTempState] = useState("");
    const [tempSpecialization, setTempSpecialization] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [loading, setLoading] = useState(false);
    const [directionsUrl, setDirectionsUrl] = useState(null); 

    // Fetch Filters on mount
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await API.get("/search/filters");
                setCities(res.data.cities || []);
                setStates(res.data.states || []);
                setSpecializations(res.data.specializations || []);
            } catch (err) {
                console.error("Error fetching filters:", err);
            }
        };
        fetchFilters();
    }, []);
    
    // Main Doctor Fetch Logic
    const fetchDoctors = useCallback(async () => {
        setLoading(true);
        setSelectedDoctor(null); 
        setDirectionsUrl(null); 
        try {
            const params = {
                city: appliedCity,
                state: appliedState,
                specialization: appliedSpecialization,
                search: search,
            };

            const queryString = Object.keys(params)
                .filter((key) => params[key])
                .map((key) => `${key}=${encodeURIComponent(params[key])}`)
                .join("&");

            const res = await API.get(`/search/doctors?${queryString}`);
            
            const doctorsData = res.data || [];
            setDoctors(doctorsData);
            setFilteredDoctors(doctorsData);

            if (doctorsData.length > 0 && doctorsData[0].lat && doctorsData[0].lng) {
                setMapCenter({ lat: doctorsData[0].lat, lng: doctorsData[0].lng });
            } else if (doctorsData.length === 0) {
                setMapCenter(defaultCenter); 
            }
            
        } catch (err) {
            console.error("Error fetching doctors:", err);
        } finally {
            setLoading(false);
        }
    }, [appliedCity, appliedState, appliedSpecialization, search]);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    // --- Filter Handlers ---
    const handleApplyFilters = () => {
        setAppliedCity(tempCity);
        setAppliedState(tempState);
        setAppliedSpecialization(tempSpecialization);
        setShowFilters(false);
    };
    
    const handleOpenFilters = () => {
        setTempCity(appliedCity);
        setTempState(appliedState);
        setTempSpecialization(appliedSpecialization);
        setShowFilters(true);
    };
    
    const handleResetTempFilters = () => {
        setTempCity("");
        setTempState("");
        setTempSpecialization("");
    };

    const resetAllFilters = () => {
        setSearch("");
        setAppliedCity("");
        setAppliedState("");
        setAppliedSpecialization("");
        setTempCity("");
        setTempState("");
        setTempSpecialization("");
        setDirectionsUrl(null); 
    };

    // --- REPLACED FIND NEARBY LOGIC ---
    /**
     * Calls the backend to find nearby doctors based on user coordinates.
     * @param {number} userLat - User's current latitude.
     * @param {number} userLng - User's current longitude.
     */
    const findNearbyDoctors = useCallback(async (userLat, userLng) => {
        setLoading(true);
        setSelectedDoctor(null);
        setDirectionsUrl(null);
        
        try {
            // Clear filters and search when running a nearby search
            resetAllFilters(); 
            
            const res = await API.get("/search/doctors/nearby", {
                params: {
                    lat: userLat,
                    lng: userLng,
                    maxDistance: 10000, // 10km in meters
                }
            });

            const doctorsData = res.data || [];
            setDoctors(doctorsData);
            setFilteredDoctors(doctorsData);
            setMapCenter({ lat: userLat, lng: userLng }); // Center map on user location
            
        } catch (err) {
            console.error("Error fetching nearby doctors:", err);
            alert("Could not fetch nearby doctors. Check server logs and ensure your database has a geospatial index.");
        } finally {
            setLoading(false);
        }
    }, []);

    // --- UPDATED DIRECTIONS LOGIC ---
    /**
     * Fetches the directions URL from the server.
     * @param {number} originLat - User's current latitude (Origin).
     * @param {number} originLng - User's current longitude (Origin).
     * @param {number} destLat - Doctor's latitude (Destination).
     * @param {number} destLng - Doctor's longitude (Destination).
     */
    const getDirectionsToDoctor = useCallback(async (originLat, originLng, destLat, destLng) => {
        setDirectionsUrl(null); 
        setLoading(true);

        try {
            // Call the server with both origin and destination
            const res = await API.get(`/search/directions`, {
                params: {
                    originLat,
                    originLng,
                    destLat,
                    destLng,
                },
            });
            
            const fetchedUrl = res.data.url;

            if (fetchedUrl) {
                // Set state for display/debugging (optional)
                setDirectionsUrl(fetchedUrl); 
                // Open Google Maps navigation in a new tab
                window.open(fetchedUrl, '_blank'); 
            } else {
                alert(res.data.message || "Could not find a route between your location and the doctor.");
            }
            
        } catch (err) {
            console.error("Error fetching directions:", err);
            alert("Could not fetch directions. Check server logs.");
        } finally {
            setLoading(false);
        }
    }, []);


    return {
        doctors,
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
        findNearbyDoctors, // EXPOSED THE NEW FUNCTION
    };
};

export default useDoctorSearch;