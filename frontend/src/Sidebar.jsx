import { AiFillHome, AiOutlinePlaySquare, AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineHistory } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* 1. Dark Overlay (Backdrop) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />

      {/* 2. Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-white z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Sidebar Header (Menu + Logo) */}
        <div className="flex items-center gap-4 px-4 h-14">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <RxHamburgerMenu size={22} />
          </button>
          <div className="flex items-center gap-1">
            <FaYoutube size={30} className="text-red-600" />
            <span className="font-bold text-xl tracking-tighter">YouTube</span>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col py-2 overflow-y-auto h-[calc(100vh-56px)]">
          <SidebarItem icon={<AiFillHome size={22} />} label="Home" active />
          <SidebarItem icon={<AiOutlinePlaySquare size={22} />} label="Shorts" />
          <SidebarItem icon={<MdOutlineSubscriptions size={22} />} label="Subscriptions" />
          
          <hr className="my-2 border-gray-200" />
        
          <div className="px-4 py-2 font-semibold text-sm">You</div>
          <SidebarItem icon={<MdOutlineVideoLibrary size={22} />} label="Library" />
          <SidebarItem icon={<MdOutlineHistory size={22} />} label="History" />
          <SidebarItem icon={<AiOutlineClockCircle size={22} />} label="Watch Later" />
        </nav>
      </aside>
    </>
  );
}

// Helper component for reusable menu items
function SidebarItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-5 px-4 py-2.5 cursor-pointer hover:bg-gray-100 rounded-lg mx-2 ${active ? 'bg-gray-100 font-medium' : ''}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}