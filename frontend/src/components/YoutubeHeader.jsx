import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineVideoCamera, AiOutlineBell } from "react-icons/ai";
import { MdMic } from "react-icons/md";
import { FaYoutube, FaUserCircle } from "react-icons/fa";
import { signOut } from '../redux/userSlice';
import AuthModal from './authModal';
import ProfileDropdown from './ProfileDropdown';

export default function YoutubeHeader({ onMenuClick }) {
  const [search, setSearch] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { isSignedIn, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    setIsProfileDropdownOpen(false);
  };

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
      <div className="relative flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden sm:block">
          <AiOutlineVideoCamera size={24} title="Create" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden sm:block">
          <AiOutlineBell size={24} title="Notifications" />
        </button>

        {isSignedIn ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-700 transition"
            >
              {currentUser?.name?.charAt(0) || "A"}
            </button>

            {isProfileDropdownOpen && (
              <ProfileDropdown
                user={currentUser || { name: 'User', handle: 'user123' }}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full text-blue-600 font-medium hover:bg-blue-50 transition cursor-pointer whitespace-nowrap"
          >
            <FaUserCircle size={24} />
            <span className="text-sm">Sign in</span>
          </button>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </header>
  );
}