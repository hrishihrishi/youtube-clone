import express from 'express';
const router = express.Router();
import { upload } from '../config/gridFsConfig.js';
import { uploadVideoData, streamVideo, getAllVideos, getVideoDetails, updateVideoDetails, deleteVideo, getFilteredVideos, getVideosByChannel } from '../controllers/videoController.js';
import { protect } from '../middlewares/authmiddleware.js';

// ROUTE: Uploading video and thumbnail
// Protected: Only logged-in users can upload
router.post('/upload', protect, upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), uploadVideoData);

// ROUTE: Video Streaming
router.get('/stream/:filename', streamVideo);

// Get all videos
router.get('/getAllVideos', getAllVideos);

router.get('/getVideoDetails/:id', getVideoDetails);

// Protected: Only logged-in users can update likes/details
router.post('/updateVideoDetails/:id', protect, updateVideoDetails);

// Protected: Only logged-in users can delete videos
router.delete('/deleteVideo/:id', protect, deleteVideo);

router.get('/getFilteredVideos', getFilteredVideos);

router.get('/getVideosByChannel', getVideosByChannel);

export default router;