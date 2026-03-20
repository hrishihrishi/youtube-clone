import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * SearchPageVideoCard Component: Specialized card layout for search results.
 * Features a horizontal layout on larger screens to mimic the vanilla YouTube search UI.
 */
export default function SearchPageVideoCard({ video }) {
  const navigate = useNavigate();

  // Redirects to the playback page when any part of the card is clicked
  const handleCardClick = () => {
    navigate(`/VideoPlaying?id=${video._id}`);
  };

  return (
    <div onClick={handleCardClick} className="flex flex-col sm:flex-row gap-4 cursor-pointer group mb-4" style={{ backgroundColor: 'var(--bg-surface)' }}>

      {/* 
          1. Large Thumbnail: 
          Fixed width on desktop (360px), responsive aspect-ratio on mobile.
          Uses the backend stream endpoint for the source image.
      */}
      <div className="relative shrink-0 w-full sm:w-[360px] aspect-video rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <img
          src={`http://localhost:5000/api/videos/stream/${video.thumbnail}`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {/* Placeholder for video duration */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-medium">
          10:05
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1 py-1">
        <h3 className="text-lg md:text-xl font-normal line-clamp-2 group-hover:text-blue-600">
          {video.title}
        </h3>

        <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
          <span>{video.views} views</span>
          <span>•</span>
          <span>{new Date(video.dateTime).toLocaleDateString()}</span>
        </div>

        {/* Creator Identity: Avatar and channel name together */}
        <div className="flex items-center gap-2 py-3">
          <div className="h-6 w-6 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channel}`} alt="avatar" />
          </div>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{video.channel}</span>
        </div>

        {/* Description Snippet */}
        <p className="text-xs line-clamp-1 hidden md:block" style={{ color: 'var(--text-secondary)' }}>
          {video.description || "Discover more about this video and the creator by clicking above."}
        </p>
      </div>
    </div>
  );
}