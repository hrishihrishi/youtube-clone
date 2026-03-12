import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineVideoCamera, AiOutlineBell } from "react-icons/ai";
import { MdMic } from "react-icons/md";
import { FaYoutube, FaUserCircle } from "react-icons/fa";
import { signOut } from '../redux/userSlice';
import AuthModal from './authModal';
import ProfileDropdown from './ProfileDropdown';
import UploadModal from './UploadModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../index.css';
import classes from '../components/youtubeheader.module.css'; // Scoped CSS modules
import { tags } from '../config/tags';
import cx from 'classnames';

/**
 * YoutubeHeader Component: The top navigation bar.
 * Contains search bar, user authentication controls, upload trigger, and category tags.
 */
export default function YoutubeHeader({ onMenuClick }) {
  // Local state for the search input value
  const [search, setSearch] = useState("");
  // States to control various modals and dropdowns
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Retrieve authentication status and user data from Redux global state
  const { isSignedIn, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Helper to handle user logout via Redux and redirection
  const handleSignOut = () => {
    dispatch(signOut());
    setIsProfileDropdownOpen(false);
    Navigate('/');
  };

  return (
    <>
      <header className={classes.youtubeheader}>

        {/* Left Section: Hamburger Menu and YouTube Logo */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer sm:mr-1" onClick={onMenuClick}>
            <RxHamburgerMenu size={22} />
          </button>

          <div className="hidden sm:flex items-center gap-1 cursor-pointer" onClick={() => Navigate('/')}>
            <FaYoutube size={30} className="text-red-600" />
            <span className="font-bold text-xl tracking-tighter">YouTube</span>
          </div>
        </div>

        {/* Center Section: Search Bar and (Hidden) Mic Icon */}
        <div className="flex flex-grow max-w-[720px] items-center gap-4 ml-2 md:ml-10 lg:ml-10 ">
          <div className="flex w-full">

            {/* Main search input field with 'Enter' key support */}
            <div className="flex w-full items-center border border-gray-300 rounded-l-full px-4 py-1 focus-within:border-blue-500 shadow-inner">
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && Navigate('/SearchPage?searchSentence=' + search)}
              />
            </div>

            {/* Explicit Search button */}
            <button className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-full px-5 py-2 hover:bg-gray-100 border-solid cursor-pointer mr-1"
              onClick={() => {
                if (search == "" || search == null || search == undefined) {
                  alert("Please enter a search term");
                  return;
                }
                Navigate('/SearchPage?searchSentence=' + search)
              }}
            >
              <AiOutlineSearch size={22} />
            </button>
          </div>
        </div>

        {/* Right Section: Create Button, Notifications, and User Profile/Sign-in */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 active:scale-95 group"
          aria-label="Create"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              className="pointer-events-none block w-full h-full fill-current text-black"
            >
              <path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V4a1 1 0 00-1-1Z"></path>
            </svg>
          </div>
          <span className="hidden sm:flex text-sm font-medium text-black">Create</span>
        </button>

        {/* Conditional rendering for the Video Upload Modal */}
        {isUploadModalOpen && <UploadModal isUploadModalOpen={isUploadModalOpen} setIsUploadModalOpen={setIsUploadModalOpen} />}

        <div className="relative flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden sm:block">
            <AiOutlineBell size={24} title="Notifications" />
          </button>

          {/* User Profile logic: Show avatar and dropdown if signed in, otherwise show Sign In button */}
          {isSignedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-8 h-8 rounded-full bg-purple-600 items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-700 transition"
              >
                {currentUser?.user?.username?.charAt(0).toUpperCase() || currentUser?.user?.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {isProfileDropdownOpen && (
                <ProfileDropdown
                  user={currentUser || { username: 'User', name: 'User', handle: 'user123' }}
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

        {/* Authentication Modal for Sign In and Sign Up */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

      </header>

      {/* Category Tags Section: Horizontally scrollable list of video categories */}
      <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto border-b border-gray-100 bg-white scrollbar-hide justify-around">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              if (tag === "All") {
                params.delete("category"); // Removing category filter for "All"
                Navigate(`/SearchPage?${params.toString()}`);
              } else {
                params.set("category", tag); // Apply specific category filter
                Navigate(`/SearchPage?${params.toString()}`);
                // window.location.reload();
              }
            }}
            className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${tag === "All"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
}