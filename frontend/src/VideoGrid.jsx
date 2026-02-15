import VideoCard from './components/VideoCard';
import { videoData } from './data/videos.jsx'; 

export default function VideoGrid({ isSidebarOpen, videos }) {
  return (
    <div className={`
      grid gap-4 p-4 transition-all duration-300
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3
    `}>
      {videoData.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
}