import { MdOutlineAccountBox, MdOutlineLogin, MdOutlineSettings, MdHelpOutline, MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { SiGooglecloud } from "react-icons/si";
import '../index.css';
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/userPrefrences";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

// MODAL FOR PROFILE AND SETTINGS OPTIONS
export default function ProfileDropdown({ user, onSignOut, onClose }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.userPrefrences.theme);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 right-0 w-72 shadow-xl rounded-xl py-2 z-[100]"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
    >

      {/* User Info Section */}
      <div className="flex gap-4 px-4 py-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div className="h-10 w-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
          {user?.username?.charAt(0) || user?.name?.charAt(0) || "U"}
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="font-medium text-base truncate">{user?.user?.username || user?.user?.name}</p>
          <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>@{user?.user?.username?.toLowerCase() || user?.user?.handle}</p>
          <a href="/ChannelPage" className="text-blue-600 text-sm mt-2 hover:underline">View your channel</a>
        </div>
      </div>

      {/* Menu Links */}
      <div className="py-2" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <DropdownItem icon={<SiGooglecloud size={20} />} label="Google Account" />
        <DropdownItem icon={<MdOutlineAccountBox size={20} />} label="Switch account" />
        <button onClick={onSignOut} className="w-full">
          <DropdownItem icon={<MdOutlineLogin size={20} />} label="Sign out" />
        </button>

        {/* theme toggle */}
        <button onClick={() => dispatch(setTheme(theme === "dark" ? "light" : "dark"))} className="w-full">
          <DropdownItem
            icon={theme === 'dark' ? <MdOutlineNightlight size={20} /> : <MdOutlineLightMode size={20} />}
            label={`Appearance: ${theme === 'dark' ? 'Dark' : 'Light'}`}
            onClick={() => { dispatch(setTheme(theme === "dark" ? "light" : "dark")) }}
          />
        </button>
      </div>

      <div className="py-2">
        <DropdownItem icon={<MdOutlineSettings size={20} />} label="Settings" />
        <DropdownItem icon={<MdHelpOutline size={20} />} label="Help" />
      </div>
    </div>
  );
}

// Reusable Menu Item Component
function DropdownItem({ icon, label }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
      <span style={{ color: 'var(--text-secondary)' }}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}