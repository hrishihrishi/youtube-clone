import { useState, useEffect } from 'react';
import VideoCard from './components/VideoCard';
// import { videoData } from './data/videos.jsx'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VideoGrid({ isSidebarOpen }) {
  const navigate = useNavigate();
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        axios.get('http://localhost:5000/api/videos/getAllVideos')
        .then(res => setAllVideos(res.data))
        .catch(err => console.log(err))
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className={`
      grid gap-4 p-4 transition-all duration-300
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3
    `}>
      {allVideos.map((video) => (
        <div key={video._id} onClick={() => navigate(`/VideoPlaying?id=${video._id}`)} className="cursor-pointer">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}