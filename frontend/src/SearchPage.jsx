import React, { useState, useEffect } from 'react';
import SearchPageVideoCard from './components/SearchPageVideoCard';
import { fetchFilteredVideos } from './service/videoservice';
import { useSearchParams } from 'react-router-dom';

/**
 * SearchPage Component: Handles the display of video results based on user queries or category filters.
 * Synchronizes results with URL search parameters for shareable states.
 */
export default function SearchPage({ isSidebarOpen = false }) {
  // State for the list of videos that match the search criteria
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noQuery, setNoQuery] = useState(false);

  // React Router hook to read values from the query string (e.g., ?searchSentence=react&category=Music)
  const [searchParams] = useSearchParams();
  const searchSentence = searchParams.get('searchSentence') || "";
  const category = searchParams.get('category') || "";

  /**
   * Effect: Re-fetches videos whenever the search query or category changes.
   */
  useEffect(() => {
    // If no criteria are provided, reset to initial state
    if (!searchSentence && !category) {
      console.log("No search sentence or category provided");
      setNoQuery(true);
      return;
    }

    setLoading(true);

    // Call the service layer to perform the filtered API request
    fetchFilteredVideos(searchSentence, category)
      .then(data => {
        setFilteredVideos(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchSentence, category]);

  return (
    noQuery ? (
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-xl font-medium">No results found</h2>
        <p className="text-gray-500">Try different keywords or more general terms.</p>
      </div>
    ) : (
      <div className={`transition-all duration-300 p-4 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}>
        <div className="max-w-[1100px] mx-auto flex flex-col gap-4">

          {loading ? (
            <p className="text-center text-gray-600 mt-10">Searching for "{searchSentence}"...</p>
          ) : (
            <>
              {/* Display results or a 'not found' message */}
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <SearchPageVideoCard key={video._id} video={video} />
                ))
              ) : (
                <div className="flex flex-col items-center mt-20">
                  <h2 className="text-xl font-medium">No results found</h2>
                  <p className="text-gray-500">Try different keywords or more general terms.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  )
}