import React from 'react';

export default function SearchPageVideoCard({ video }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 cursor-pointer group mb-4">
      
      {/* Thumbnail: Large on desktop, full-width on mobile */}
      <div className="relative shrink-0 w-full sm:w-[360px] aspect-video rounded-xl overflow-hidden bg-gray-100">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-medium">
          10:05
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1 py-1">
        <h3 className="text-lg md:text-xl font-normal line-clamp-2 group-hover:text-blue-600">
          {video.title}
        </h3>
        
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.uploadDate}</span>
        </div>

        {/* Channel Info */}
        <div className="flex items-center gap-2 py-3">
          <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.uploader}`} alt="avatar" />
          </div>
          <span className="text-xs text-gray-600 hover:text-black">{video.uploader}</span>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-gray-600 line-clamp-1 hidden md:block">
          {video.description || "Discover more about this video and the creator by clicking above."}
        </p>
      </div>
    </div>
  );
}