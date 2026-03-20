/**
 * VideoCard Component: Renders a preview card for a single video.
 * Displays thumbnail, metadata, and channel information.
 */
export default function VideoCard({ video }) {

  /**
   * Simple view formatter logic.
   * Converts raw numbers like 15200 into readable strings like "15.2K".
   */
  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  /**
   * Date formatter logic.
   * Converts ISO date strings into a user-friendly format (e.g., "Mar 5, 2026").
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  /* 
     Thumbnail URL Generation:
     The thumbnail is stored as a filename in MongoDB GridFS.
     We request it via our dedicated backend streaming endpoint.
  */
  const thumbnailUrl = `http://localhost:5000/api/videos/stream/${video.thumbnail}`;

  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      {/* 
          1. Thumbnail Section: 
          Uses aspect-video to maintain 16:9 ratio and a hover zoom effect.
      */}
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <img src={thumbnailUrl} alt={video.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
        {/* Placeholder for video duration (could be dynamic in future) */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          12:34
        </div>
      </div>

      {/* 2. Video Details Section (Avatar + Title + Meta) */}
      <div className="flex gap-3">
        {/* Channel Avatar: Uses DiceBear API to generate a consistent avatar based on channel name */}
        <div className="h-9 w-9 rounded-full flex-shrink-0 mt-1 overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channel}`} alt="avatar" />
        </div>

        <div className="flex flex-col overflow-hidden">
          {/* Video Title: Clamped to 2 lines for UI consistency */}
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {video.title}
          </h3>
          {/* Channel Name */}
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {video.channel}
          </p>
          {/* View count and Upload date */}
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {formatViews(video.views)} views • {formatDate(video.dateTime)}
          </div>
        </div>
      </div>
    </div>
  );
}