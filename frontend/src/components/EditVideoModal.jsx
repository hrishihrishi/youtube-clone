import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function EditVideoModal({ video, isOpen, onClose, onUpdateSuccess }) {

  const { currentUser } = useSelector((state) => state.user);

  // Initialize state with existing video data
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    category: video?.category || "Entertainment"
  });
  const [loading, setLoading] = useState(false);

  // Update state if the video prop changes
  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        description: video.description,
        category: video.category
      });
    }
  }, [video]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!currentUser?.token) {
        alert("You must be logged in to edit videos");
        return;
      }

      const res = await axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${video._id}`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}` // Assuming your token is here
        }
      });

      // Update the UI locally without refresh
      onUpdateSuccess(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
      alert("Video updated successfully");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl shadow-2xl p-6 relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-[var(--bg-hover)] rounded-full">
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6">Edit video details</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded p-2 focus:border-blue-500 outline-none"
              style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)' }}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded p-2 focus:border-blue-500 outline-none resize-none"
              style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded p-2 focus:border-blue-500 outline-none"
              style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)' }}
            >
              <option>Education</option>
              <option>Gaming</option>
              <option>Music</option>
              <option>Entertainment</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium hover:bg-[var(--bg-hover)] rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}