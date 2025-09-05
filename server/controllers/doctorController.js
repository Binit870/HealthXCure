import axios from 'axios';

// Google API Key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const searchDoctors = async (req, res) => {
    const { query, lat, lng } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required.' });
    }

    try {
        let location = null;

        // Use the location from the frontend if provided
        if (lat && lng) {
            location = { lat, lng };
        } else {
            // Otherwise, use the Geocoding API to find the location of the query
            const geocodeResponse = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
            );

            const geocodeResults = geocodeResponse.data.results;
            if (geocodeResults && geocodeResults.length > 0) {
                location = geocodeResults[0].geometry.location;
            }
        }

        if (!location) {
            return res.status(404).json({ message: 'Location not found.' });
        }

        // Use the Places API to find doctors near the determined location
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=50000&keyword=${encodeURIComponent(query)}&type=doctor|hospital|clinic&key=${GOOGLE_API_KEY}`
        );

        const placesResults = placesResponse.data.results;

        if (!placesResults || placesResults.length === 0) {
            return res.status(404).json({ message: 'No doctors or health facilities found near this location.' });
        }

        // Map the Google API response to the format your frontend expects
        const doctors = placesResults.map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            category: place.types.join(', '),
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
        }));

        res.status(200).json(doctors);

    } catch (error) {
        console.error('Error in search:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const cityCoordinates = {
    mumbai: "19.0760,72.8777,100",
    delhi: "28.6139,77.2090,100",
    bangalore: "12.9716,77.5946,100",
    kolkata: "22.5726,88.3639,100",
    chennai: "13.0827,80.2707,100",
};

export const getDoctors = async (req, res) => {
    try {
        const { city } = req.query;
        const location =
            cityCoordinates[city?.toLowerCase()] || cityCoordinates["mumbai"];

        const response = await axios.get(
            "https://betterdoctor.p.rapidapi.com/practice_search",
            {
                headers: {
                    "x-rapidapi-key": process.env.BETTER_DOCTOR_RAPID_API_KEY,
                    "x-rapidapi-host": "betterdoctor.p.rapidapi.com",
                },
                params: {
                    location,
                    user_location: location.split(",").slice(0, 2).join(","), // lat,lng
                    skip: 0,
                    limit: 10,
                },
            }
        );

        res.json({ doctors: response.data.data || [] });
    } catch (error) {
        console.error("❌ Error in getDoctors:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("Message:", error.message);
        }
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
};
export const getDirections = async (req, res) => {
    const { originLat, originLng, destLat, destLng } = req.query;

    if (!originLat || !originLng || !destLat || !destLng) {
        return res.status(400).json({ message: 'Missing required location parameters.' });
    }

    try {
        const directionsResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${GOOGLE_API_KEY}`
        );

        const route = directionsResponse.data.routes[0];

        if (!route) {
            return res.status(404).json({ message: 'No route found between these locations.' });
        }

        const leg = route.legs[0];

        const directionsData = {
            distance: leg.distance.text,
            duration: leg.duration.text,
            url: `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`
        };

        res.status(200).json(directionsData);
    } catch (error) {
        console.error('Error fetching directions:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
