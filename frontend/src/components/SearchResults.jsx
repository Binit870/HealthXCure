// src/components/SearchResults.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    return (
        <div className="bg-gradient-to-br from-cyan-900 to-blue-900 min-h-screen pt-20 p-5 text-white">
            <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
            {/* Here, you would fetch and display data based on the 'query' variable */}
            <p>Displaying results related to **"{query}"**...</p>
            {/* Add your logic to fetch and render the content */}
        </div>
    );
};

export default SearchResults;