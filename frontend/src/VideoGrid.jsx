import VideoCard from './components/VideoCard';

export default function VideoGrid({ isSidebarOpen, videos }) {
  return (
    <div className={`
      grid gap-4 p-4 transition-all duration-300
      grid-cols-1 
      sm:grid-cols-2 
      ${isSidebarOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}
    `}>
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
}