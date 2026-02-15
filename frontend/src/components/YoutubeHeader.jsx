import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineVideoCamera, AiOutlineBell } from "react-icons/ai";
import { MdMic } from "react-icons/md";
import { FaYoutube, FaUserCircle } from "react-icons/fa";

export default function YoutubeHeader({onMenuClick}){
  const [search, setSearch] = useState("");

  return (
    <header className="flex justify-between items-center h-14 px-4 sticky top-0 bg-white z-50">
      
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer" onClick={onMenuClick}>
          <RxHamburgerMenu size={22} />
        </button>

        {/* YOUTUBE LOGO AND ICON */}
        <div className="flex items-center gap-1 cursor-pointer">
          <FaYoutube size={30} className="text-red-600" />
          <span className="font-bold text-xl tracking-tighter">YouTube</span>
        </div>
      </div>

      {/* Center: Search Bar & Mic */}
      <div className="flex flex-grow max-w-[720px] items-center gap-4 ml-10">
        <div className="flex w-full">

          {/* INPUT SEARCH BAR */}
          <div className="flex w-full items-center border border-gray-300 rounded-l-full px-4 py-1 focus-within:border-blue-500 shadow-inner">
            <AiOutlineSearch size={20} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full outline-none text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* SEARCH ICON */}
          <button className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-full px-5 py-2 hover:bg-gray-100 border-solid">
            <AiOutlineSearch size={22} />
          </button>
        </div>
        
        {/* Mike Icon Button */}
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <MdMic size={24} className="text-black" />
        </button>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden sm:block">
          <AiOutlineVideoCamera size={24} title="Create" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden sm:block">
          <AiOutlineBell size={24} title="Notifications" />
        </button>
        <button className="p-1 cursor-pointer">
          <FaUserCircle size={32} className="text-gray-600" />
        </button>
      </div>
      
    </header>
  );
}