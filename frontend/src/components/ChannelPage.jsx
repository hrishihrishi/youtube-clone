import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../index.css';

/**
 * ChannelPage Component: Displays a user's public channel profile.
 * Shows banner, avatar, subscriber counts, and a grid of uploaded videos.
 */
export default function ChannelPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("Videos"); // Toggles between different channel views

  const tabs = ["Home", "Videos", "Shorts", "Live", "Playlists", "Community", "About"];

  // Placeholder and dynamic channel metadata
  const channel = {
    description: "Master the art of web development with project-based tutorials. New videos every Tuesday!",
    bannerUrl: "https://picsum.photos/seed/code/1500/300",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeAcademy"
  };

  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]); // Videos uploaded by this specific channel
  const [loading, setLoading] = useState(true);

  // Access global state to identify the currently logged-in user
  const { isSignedIn, currentUser } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(null); // Full profile data from the database

  /**
   * Fetches extended user profile information (subscribers, video IDs, etc.)
   */
  const fetchUserDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/getUserDetails',
        { email: currentUser?.user?.email },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );
      setUserDetails(response.data.user);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  // Trigger profile fetch when the Redux user context is available
  useEffect(() => {
    if (currentUser?.user?.email) {
      fetchUserDetails();
    }
  }, [currentUser?.user?.email]);

  /**
   * Fetches only the videos belonging to this channel.
   * Normalized by the username stored in the database.
   */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos/getVideosByChannel', { params: { channel: currentUser?.user?.username } });
        console.log('response');
        console.log('videos', response.data);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [currentUser?.user?.username]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">

      {/* 1. Channel Banner: Large hero image at the top */}
      <div className="w-full h-[16vw] min-h-[150px] max-h-[250px] overflow-hidden">
        <img
          src={channel.bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Channel Header Info: Profile picture, title, stats, and Subscribe button */}
      <div className="max-w-[1284px] mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center w-full">
        {/* Channel Icon */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border border-gray-100">
          {/* use first letter of channel name */}
          <div className="w-full h-full flex items-center justify-center text-9xl font-extrabold text-gray-600">
            {currentUser?.user?.username[0].toUpperCase() || channel.name[0].toUpperCase()}
          </div>
        </div>

        {/* Channel Details Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{userDetails?.channel || currentUser?.user?.username}</h1>
          <div className="flex gap-2 text-sm text-gray-600 font-medium">
            <span>@{userDetails?.username?.toLowerCase()}</span>
            <span>•</span>
            <span>{userDetails?.subscribersCount || 0} subscribers</span>
            <span>•</span>
            <span>{userDetails?.ownVideos?.length || 0} videos</span>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl line-clamp-1 hover:line-clamp-none cursor-pointer">
            {channel.description}
          </p>

          <div className="mt-2">
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`px-4 py-2 rounded-full font-medium transition ${isSubscribed
                ? 'bg-gray-100 text-black hover:bg-gray-200'
                : 'bg-black text-white hover:bg-zinc-800'
                }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs: Horizontally scrollable navigation across channel sections */}
      <div className="max-w-[1284px] mx-auto w-full px-4 border-b border-gray-200 sticky top-14 bg-white z-40">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold transition-colors whitespace-nowrap border-b-2 ${activeTab === tab
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-black'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Videos Grid: Displays the list of fetched video cards when "Videos" tab is active */}
      <div className="max-w-[1284px] mx-auto w-full px-4 py-6">
        {activeTab === "Videos" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {videoData.map((video) => (
              <div key={video.videoId} onClick={() => navigate(`/VideoPlaying?id=${video._id}`)} className="cursor-pointer">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 text-gray-500 italic">
            {activeTab} content is coming soon...
          </div>
        )}
      </div>

    </div>
  );
}