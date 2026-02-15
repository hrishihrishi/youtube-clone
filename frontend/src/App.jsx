import { useState } from 'react';
import YoutubeHeader from './components/YoutubeHeader'; // Your existing header
import Sidebar from './components/Sidebar';
import VideoGrid from './VideoGrid';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const videoData = [
    {
      videoId: "video01",
      title: "Learn React in 30 Minutes: From Zero to Hero",
      thumbnailUrl: "https://picsum.photos/seed/react/640/360",
      description: "A quick tutorial to get started with React.",
      channelId: "channel01",
      uploader: "CodeAcademy",
      views: 15200,
      likes: 1023,
      uploadDate: "2 days ago",
    },
    {
      videoId: "video02",
      title: "Top 10 Travel Destinations in 2026",
      thumbnailUrl: "https://picsum.photos/seed/travel/640/360",
      description: "Explore the most beautiful places on Earth.",
      channelId: "channel02",
      uploader: "GlobeTrotter",
      views: 1200000,
      likes: 85000,
      uploadDate: "1 week ago",
    },
    {
      videoId: "video03",
      title: "How to Bake the Perfect Sourdough Bread at Home",
      thumbnailUrl: "https://picsum.photos/seed/bread/640/360",
      description: "Master the art of bread making.",
      channelId: "channel03",
      uploader: "ChefBake",
      views: 450000,
      likes: 12000,
      uploadDate: "5 months ago",
    },
    {
      videoId: "video04",
      title: "Building a YouTube Clone with Tailwind CSS and React - Part 1",
      thumbnailUrl: "https://picsum.photos/seed/coding/640/360",
      description: "Full-stack project tutorial.",
      channelId: "channel04",
      uploader: "DevStream",
      views: 8900,
      likes: 500,
      uploadDate: "1 hour ago",
    },
    {
      videoId: "video05",
      title: "Relaxing Lo-Fi Hip Hop Radio - Beats to Study/Relax to",
      thumbnailUrl: "https://picsum.photos/seed/lofi/640/360",
      description: "The best beats for focusing.",
      channelId: "channel05",
      uploader: "LofiGirl Clone",
      views: 25000000,
      likes: 950000,
      uploadDate: "1 year ago",
    },
    {
      videoId: "video06",
      title: "The Future of AI: What to Expect in the Next Decade",
      thumbnailUrl: "https://picsum.photos/seed/ai/640/360",
      description: "Discussing the roadmap of artificial intelligence.",
      channelId: "channel06",
      uploader: "TechTalk",
      views: 67000,
      likes: 3200,
      uploadDate: "3 days ago",
    },
    {
      videoId: "video07",
      title: "Exploring the Deep Sea: Creatures You Won't Believe Exist",
      thumbnailUrl: "https://picsum.photos/seed/ocean/640/360",
      description: "A journey to the bottom of the ocean.",
      channelId: "channel07",
      uploader: "NatureHub",
      views: 890000,
      likes: 42000,
      uploadDate: "2 weeks ago",
    },
    {
      videoId: "video08",
      title: "Setup Tour 2026: Minimalist Workspace for Software Engineers",
      thumbnailUrl: "https://picsum.photos/seed/desk/640/360",
      description: "A look at my productive desk setup.",
      channelId: "channel08",
      uploader: "DesignDev",
      views: 34000,
      likes: 1100,
      uploadDate: "6 hours ago",
    }
  ];

  return (
    <div className="relative">
      {/* Pass the toggle function to your header */}
      <YoutubeHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar Component */}
      <div>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <VideoGrid isSidebarOpen={isSidebarOpen} videos={videoData} />
      </div>

      <main className="p-4">
        {/* Your video grid goes here */}
        <h1 className="text-2xl font-bold">Recommended Videos</h1>
      </main>
    </div>
  );
}