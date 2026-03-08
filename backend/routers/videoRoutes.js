const express = require('express');
const router = express.Router();
const { upload } = require('../config/gridFsConfig');
const videoController = require('../controllers/videoController');

// .fields allows us to upload multiple types of files at once
router.post('/upload', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), videoController.uploadVideoData);



// Route for the frontend <video src="..."> tag
router.get('/stream/:filename', videoController.streamVideo);

// Get all videos
router.get('/getAllVideos', videoController.getAllVideos);

router.get('/getVideoDetails/:id', videoController.getVideoDetails);

router.post('/updateVideoDetails/:id', videoController.updateVideoDetails);

router.delete('/deleteVideo/:id', videoController.deleteVideo);

router.get('/getFilteredVideos/:searchSentence', videoController.getFilteredVideos);

module.exports = router;