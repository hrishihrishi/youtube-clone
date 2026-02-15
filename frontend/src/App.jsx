import { useState } from 'react';
import YoutubeHeader from './components/YoutubeHeader'; // Your existing header
import Sidebar from './Sidebar';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Pass the toggle function to your header */}
      <YoutubeHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="p-4">
        {/* Your video grid goes here */}
        <h1 className="text-2xl font-bold">Recommended Videos</h1>
      </main>
    </div>
  );
}