import { MdOutlineAccountBox, MdOutlineLogin, MdOutlineSettings, MdHelpOutline } from "react-icons/md";
import { SiGooglecloud } from "react-icons/si";
import '../index.css';

// MODAL FOR PROFILE AND SETTINGS OPTIONS
export default function ProfileDropdown({ user, onSignOut }) {
  return (
    <div className="absolute top-12 right-0 w-72 bg-white shadow-xl rounded-xl border border-gray-200 py-2 z-[100] text-black">
      {/* User Info Section */}
      <div className="flex gap-4 px-4 py-3 border-b border-gray-100">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
          {user?.username?.charAt(0) || user?.name?.charAt(0) || "U"}
        </div>
        <div className="flex flex-col overflow-hidden">
          <p className="font-medium text-base truncate">{user?.username || user?.name}</p>
          <p className="text-sm text-gray-600 truncate">@{user?.username?.toLowerCase() || user?.handle}</p>
          <a href="/ChannelPage" className="text-blue-600 text-sm mt-2 hover:underline">View your channel</a>
        </div>
      </div>

      {/* Menu Links */}
      <div className="py-2 border-b border-gray-100">
        <DropdownItem icon={<SiGooglecloud size={20} />} label="Google Account" />
        <DropdownItem icon={<MdOutlineAccountBox size={20} />} label="Switch account" />
        <button onClick={onSignOut} className="w-full">
          <DropdownItem icon={<MdOutlineLogin size={20} />} label="Sign out" />
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
    <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
      <span className="text-gray-600">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}