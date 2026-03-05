export default function VideoCard({ video }) {
  // Simple view formatter (e.g., 15200 -> 15K)
  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  // Format the dateTime into a readable string (e.g., "Mar 5, 2026")
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Thumbnail is stored as a GridFS filename, serve it via the backend stream endpoint
  const thumbnailUrl = `http://localhost:5000/api/videos/stream/${video.thumbnail}`;

  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <img src={thumbnailUrl} alt={video.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          12:34
        </div>
      </div>

      {/* Video Details */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-gray-200 flex-shrink-0 mt-1 overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channel}`} alt="avatar" />
        </div>

        <div className="flex flex-col overflow-hidden">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1 hover:text-black">
            {video.channel}
          </p>
          <div className="text-gray-600 text-sm">
            {formatViews(video.views)} views • {formatDate(video.dateTime)}
          </div>
        </div>
      </div>
    </div>
  );
}