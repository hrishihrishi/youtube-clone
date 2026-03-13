import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete, MdVideoLibrary } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import UploadModal from './UploadModal';
import EditVideoModal from './EditVideoModal';
import { deleteVideo } from '../service/videoservice.js';
import '../index.css';

/**
 * ChannelPage Component: Displays the user's channel profile.
 * Supports full CRUD for videos:
 *  - Create: via UploadModal
 *  - Read: video grid with thumbnails
 *  - Update: per-card EditVideoModal
 *  - Delete: per-card delete with confirmation
 */
export default function ChannelPage() {
  const tabs = ["Home", "Videos", "Shorts", "Live", "Playlists", "Community", "About"];
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("Videos");

  const channel = {
    description: "Master the art of web development with project-based tutorials. New videos every Tuesday!",
    bannerUrl: "https://picsum.photos/seed/code/1500/300",
  };

  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redux: identify the currently logged-in user
  const { currentUser } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState(null);

  // Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null); // null = closed, object = open

  // ─── Fetch user profile ────────────────────────────────────────────────────
  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/getUserDetails',
        { email: currentUser?.user?.email },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );
      setUserDetails(response.data.user);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.user?.email) fetchUserDetails();
  }, [currentUser?.user?.email]);

  // ─── Fetch channel videos ──────────────────────────────────────────────────
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/videos/getVideosByChannel', {
        params: { channel: currentUser?.user?.username },
      });
      setVideoData(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.user?.username) fetchVideos();
  }, [currentUser?.user?.username]);


  // Called when UploadModal closes — refresh video list to show newly uploaded video
  const handleUploadClose = () => {
    setIsUploadModalOpen(false);
    fetchVideos();
  };

  // Called after EditVideoModal saves successfully — update local state immediately
  const handleUpdateSuccess = (updatedVideo) => {
    setVideoData((prev) =>
      prev.map((v) => (v._id === updatedVideo._id ? updatedVideo : v))
    );
    setEditingVideo(null);
  };

  // Delete a video by id and refresh the list
  const handleDelete = async (videoId) => {
    await deleteVideo(videoId, currentUser?.token);
    // Remove from local state immediately for a snappy UX
    setVideoData((prev) => prev.filter((v) => v._id !== videoId));
  };

  const isOwner = !!currentUser; // Only logged-in user views their own channel page

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">

      {/* ── Upload Modal (Create) ──────────────────────────────────────── */}
      <UploadModal
        isUploadModalOpen={isUploadModalOpen}
        setIsUploadModalOpen={handleUploadClose}
      />

      {/* ── Edit Video Modal (Update) ──────────────────────────────────── */}
      {editingVideo && (
        <EditVideoModal
          video={editingVideo}
          isOpen={!!editingVideo}
          onClose={() => setEditingVideo(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* ── 1. Channel Banner ──────────────────────────────────────────── */}
      <div className="w-full h-[16vw] min-h-[150px] max-h-[250px] overflow-hidden">
        <img src={channel.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      </div>

      {/* ── 2. Channel Header Info ─────────────────────────────────────── */}
      <div className="max-w-[1284px] mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center w-full">
        {/* Avatar: first letter */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-100 flex items-center justify-center">
          <span className="text-7xl font-extrabold text-gray-600">
            {currentUser?.user?.username?.[0]?.toUpperCase() ?? '?'}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 flex-grow">
          <h1 className="text-4xl font-bold">{userDetails?.channel || currentUser?.user?.username}</h1>
          <div className="flex gap-2 text-sm text-gray-600 font-medium flex-wrap">
            <span>@{userDetails?.username?.toLowerCase()}</span>
            <span>•</span>
            <span>{userDetails?.subscribersCount || 0} subscribers</span>
            <span>•</span>
            <span>{videoData.length} videos</span>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl line-clamp-1 hover:line-clamp-none cursor-pointer">
            {channel.description}
          </p>

          {/* Action row */}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {isOwner && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full font-semibold hover:bg-zinc-800 transition text-sm"
              >
                <AiOutlinePlusCircle size={18} />
                Upload Video
              </button>
            )}
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`px-4 py-2 rounded-full font-medium transition text-sm ${isSubscribed
                ? 'bg-gray-100 text-black hover:bg-gray-200'
                : 'bg-gray-800 text-white hover:bg-zinc-700'
                }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Navigation Tabs ─────────────────────────────────────────── */}
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

      {/* ── 4. Videos Grid ─────────────────────────────────────────────── */}
      <div className="max-w-[1284px] mx-auto w-full px-4 py-6">
        {activeTab === "Videos" ? (
          loading ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              Loading videos...
            </div>
          ) : videoData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
              <MdVideoLibrary size={60} className="text-gray-300" />
              <p className="text-lg font-semibold">No videos yet</p>
              {isOwner && (
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition text-sm"
                >
                  Upload your first video
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {videoData.map((video) => (
                <ChannelVideoCard
                  key={video._id}
                  video={video}
                  isOwner={isOwner}
                  onPlayClick={() => navigate(`/VideoPlaying?id=${video._id}`)}
                  onEditClick={() => setEditingVideo(video)}
                  onDeleteClick={() => handleDelete(video._id)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center py-20 text-gray-500 italic">
            {activeTab} content is coming soon...
          </div>
        )}
      </div>

    </div>
  );
}

/**
 * A video card specifically for the Channel page.
 * Shows thumbnail + metadata + owner-only Edit & Delete controls.
 */
function ChannelVideoCard({ video, isOwner, onPlayClick, onEditClick, onDeleteClick }) {
  const thumbnailUrl = `http://localhost:5000/api/videos/stream/${video.thumbnail}`;

  const formatViews = (v) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
    if (v >= 1_000) return (v / 1_000).toFixed(1) + 'K';
    return v;
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-3 group">
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden rounded-xl cursor-pointer"
        onClick={onPlayClick}
      >
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
          12:34
        </div>
      </div>

      {/* Details row */}
      <div className="flex gap-2 pr-1">
        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-gray-200 flex-shrink-0 mt-0.5 overflow-hidden">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.channel}`}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col overflow-hidden flex-grow">
          {/* Title — clickable */}
          <h3
            className="font-semibold text-sm leading-tight line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={onPlayClick}
          >
            {video.title}
          </h3>
          <p className="text-gray-500 text-xs mt-1">{video.channel}</p>
          <p className="text-gray-500 text-xs">
            {formatViews(video.views)} views • {formatDate(video.dateTime)}
          </p>
        </div>
      </div>

      {/* Owner-only action buttons */}
      {isOwner && (
        <div className="flex gap-2 pl-11">
          <button
            onClick={onEditClick}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full transition"
            title="Edit video details"
          >
            {/* edit icon */}
            <MdEdit size={14} /> Edit
          </button>
          <button
            onClick={onDeleteClick}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition"
            title="Delete video"
          >
            {/* delete icon */}
            <MdDelete size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}