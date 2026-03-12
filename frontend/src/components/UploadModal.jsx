import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdClose, MdFileUpload, MdOutlinePhotoLibrary } from 'react-icons/md';
import axios from 'axios';
import '../index.css';
import { tags } from '../config/tags';

/**
 * UploadModal Component: Provides a UI for users to upload new videos.
 * Handles text metadata and multi-file uploads (video + thumbnail).
 */
export default function UploadModal({ isUploadModalOpen, setIsUploadModalOpen }) {
  // Access current user info to associate the upload with a specific channel
  const currentUser = useSelector((state) => state.user.currentUser);

  // Local state for all form fields including raw file objects
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Entertainment",
    videoFile: null,
    thumbnail: null,
  });

  // Early return if modal is toggled off
  if (!isUploadModalOpen) return null;

  /**
   * Updates text-based state values.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Specifically handles file input changes to store the raw File object.
   */
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  /**
   * Orchestrates the upload process to the backend.
   * Uses FormData to support multi-part/form-data requests (required for files).
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Uploading video...");

    if (!formData.videoFile || !formData.thumbnail) {
      alert("Please select both a video and a thumbnail.");
      return;
    }

    /* 
       Prepare Multi-part Data:
       We append all fields to a FormData object which Axios sends with correct headers.
    */
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("video", formData.videoFile); // Field name for the backend
    data.append("thumbnail", formData.thumbnail);
    data.append("channel", currentUser?.user?.username || "Anonymous"); // Match model "channel" field

    try {
      const response = await axios.post("http://localhost:5000/api/videos/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${currentUser?.token}`
        },
      });
      alert("Video uploaded successfully");
      console.log("Video uploaded successfully:", response.data);
      setIsUploadModalOpen(false);
    } catch (error) {
      alert("Error uploading video");
      console.error("Error uploading video:", error.response?.data || error.message);
    }
  };





  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Upload video</h2>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Side: Text Inputs */}
          <div className="flex flex-col gap-6">

            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Title (required)</label>
              <input
                name="title"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 outline-none"
                placeholder="Add a title that describes your video"
                onChange={handleInputChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Description</label>
              <textarea
                name="description"
                rows="5"
                className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 outline-none resize-none"
                placeholder="Tell viewers about your video"
                onChange={handleInputChange}
              />
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Category</label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 outline-none bg-white"
                onChange={handleInputChange}
              >
                {
                  tags.map((tag) => (
                    <option key={tag}>{tag}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* Right Side: File Uploads */}
          <div className="flex flex-col gap-6">

            {/* VIDEO FILE INPUT */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 bg-gray-50">
              <div className="p-4 bg-white rounded-full shadow-sm text-gray-500">
                <MdFileUpload size={40} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Select Video File</p>
                <p className="text-xs text-gray-500 mt-1">MP4, WEBM, or MOV</p>
              </div>
              <input
                type="file"
                id="videoInput"
                name="videoFile"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="videoInput"
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium cursor-pointer hover:bg-blue-700 transition"
              >
                SELECT FILE
              </label>
              {formData.videoFile && <span className="text-xs text-green-600 font-bold">{formData.videoFile.name}</span>}
            </div>

            {/* THUMBNAIL INPUT */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Thumbnail</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="thumbInput"
                  name="thumbnail"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="thumbInput"
                  className="w-32 h-20 border border-gray-300 rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition border-dashed"
                >
                  <MdOutlinePhotoLibrary className="text-gray-400" size={24} />
                  <span className="text-[10px] text-gray-500 uppercase">Upload</span>
                </label>
                {formData.thumbnail && (
                  <div className="h-20 w-32 rounded bg-gray-100 flex items-center justify-center text-[10px] text-center p-2 truncate">
                    {formData.thumbnail.name}
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 hover:bg-gray-200 rounded-full font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}