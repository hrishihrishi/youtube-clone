import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdClose, MdFileUpload, MdOutlinePhotoLibrary } from 'react-icons/md';

export default function UploadModal({ isUploadModalOpen, setIsUploadModalOpen }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Entertainment",
    videoFile: null,
    thumbnail: null,
  });

  if (!isUploadModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Auto-populated data structure
    const finalVideoData = {
      ...formData,
      owner: currentUser?.name || "Anonymous", // From Redux
      uploadDate: new Date().toLocaleDateString(),
      uploadTime: new Date().toLocaleTimeString(),
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    console.log("Submitting to Database:", finalVideoData);
    // Add your Firebase/API upload logic here
    setIsUploadModalOpen(false);
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

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Category</label>
              <select 
                name="category"
                className="w-full border border-gray-300 rounded-md p-3 focus:border-blue-500 outline-none bg-white"
                onChange={handleInputChange}
              >
                <option>Education</option>
                <option>Gaming</option>
                <option>Music</option>
                <option>Tech</option>
                <option>Entertainment</option>
              </select>
            </div>
          </div>

          {/* Right Side: File Uploads */}
          <div className="flex flex-col gap-6">
            {/* Video File Input */}
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

            {/* Thumbnail Input */}
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
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
          <button 
            onClick={() => setIsUploadModalOpen(false)}
            className="px-4 py-2 hover:bg-gray-200 rounded-full font-medium transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}