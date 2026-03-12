import { useState, useEffect } from 'react';
import VideoCard from './components/VideoCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * VideoGrid Component: Fetches and displays a responsive grid of videos.
 * This is the primary component for the Homepage.
 */
export default function VideoGrid({ isSidebarOpen }) {
  const navigate = useNavigate();
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch all available videos from the backend API
        axios.get('http://localhost:5000/api/videos/getAllVideos')
        .then(res => setAllVideos(res.data))
        .catch(err => console.log(err))
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        // Stop the loading indicator regardless of success or failure
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    /* 
       Responsive Grid Layout:
       - 1 column on mobile
       - 2 columns on small screens (sm)
       - 3 columns on larger screens (lg)
    */
    <div className={`grid gap-4 p-4 transition-all duration-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
      {allVideos.map((video) => (
        // When a video card is clicked, navigate to the playback page with the video ID in the query string
        <div key={video._id} onClick={() => navigate(`/VideoPlaying?id=${video._id}`)} className="cursor-pointer">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}