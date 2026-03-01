import React from 'react';
import SearchPageVideoCard from './components/SearchPageVideoCard';
import { videoData } from './data/videos';

export default function SearchPage({ isSidebarOpen=false, searchSentence='' }) {
  
  // 1. Search Algorithm
  const filterVideos = () => {
    if (!searchSentence) return videoData;

    // Split search sentence into lowercase words
    const searchKeys = searchSentence.toLowerCase().split(' ').filter(word => word !== '');

    return videoData.filter((video) => {
      const title = video.title.toLowerCase();
      // Check if any search key is present in the title
      return searchKeys.some((key) => title.includes(key));
    });
  };

  const filteredVideos = filterVideos();

  return (
    <div className={`transition-all duration-300 p-4 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}>
      <div className="max-w-[1100px] mx-auto flex flex-col gap-4">
        
        {/* Search Stats */}
        <p className="text-sm text-gray-600 mb-2">
          About {filteredVideos.length} results for "{searchSentence}"
        </p>

        {/* Results List */}
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <SearchPageVideoCard key={video.videoId} video={video} />
          ))
        ) : (
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-xl font-medium">No results found</h2>
            <p className="text-gray-500">Try different keywords or more general terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}