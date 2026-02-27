import { useState } from 'react';
import VideoCard from './VideoCard';
import { videoData } from '../data/videos';

export default function ChannelPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("Videos");

  const tabs = ["Home", "Videos", "Shorts", "Live", "Playlists", "Community", "About"];

  // Channel details
  const channel = {
    name: "CodeAcademy",
    handle: "@codeacademy_official",
    subscribers: "1.24M",
    videoCount: "450 videos",
    description: "Master the art of web development with project-based tutorials. New videos every Tuesday!",
    bannerUrl: "https://picsum.photos/seed/code/1500/300",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeAcademy"
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      
      {/* 1. Channel Banner */}
      <div className="w-full h-[16vw] min-h-[150px] max-h-[250px] overflow-hidden">
        <img 
          src={channel.bannerUrl} 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Channel Header Info */}
      <div className="max-w-[1284px] mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center w-full">
        {/* Channel Icon */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border border-gray-100">
          <img src={channel.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        </div>

        {/* Channel Details */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{channel.name}</h1>
          <div className="flex gap-2 text-sm text-gray-600 font-medium">
            <span>{channel.handle}</span>
            <span>•</span>
            <span>{channel.subscribers} subscribers</span>
            <span>•</span>
            <span>{channel.videoCount}</span>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl line-clamp-1 hover:line-clamp-none cursor-pointer">
            {channel.description}
          </p>
          
          <div className="mt-2">
            <button 
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                isSubscribed 
                  ? 'bg-gray-100 text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="max-w-[1284px] mx-auto w-full px-4 border-b border-gray-200 sticky top-14 bg-white z-40">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Videos Grid (Active Content) */}
      <div className="max-w-[1284px] mx-auto w-full px-4 py-6">
        {activeTab === "Videos" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {videoData.map((video) => (
              <VideoCard key={video.videoId} video={video} />
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