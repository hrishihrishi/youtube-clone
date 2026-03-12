import mongoose from 'mongoose';
import Video from '../models/video.js';

// Reference to the GridFS bucket for file streaming
let gfs;
const conn = mongoose.connection;

// Initialize GridFS bucket once the database connection is established
conn.once('open', () => {
    // GridFSBucket is the modern MongoDB driver method for handling large file storage/retrieval
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
});

/**
 * Handles saving video metadata to the database after files are uploaded by Multer.
 */
export const uploadVideoData = async (req, res) => {
    try {
        // Ensure both the video and thumbnail files were successfully uploaded
        if (!req.files || !req.files['video'] || !req.files['thumbnail']) {
            return res.status(400).json({ error: "Missing video or thumbnail file" });
        }

        // Create a new Video document with metadata and GridFS filenames
        const newVideo = new Video({
            ...req.body,
            video: req.files['video'][0].filename,     // Storing the unique filename from GridFS
            thumbnail: req.files['thumbnail'][0].filename,
        });

        // Persist video metadata to MongoDB
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Streams a video file from GridFS directly to the client's browser.
 * This allows for partial playback without downloading the entire file first.
 */
export const streamVideo = (req, res) => {
    console.log(`Streaming requested: ${req.params.filename}`);

    // Open a readable stream from the 'uploads' bucket using the filename
    const stream = gfs.openDownloadStreamByName(req.params.filename);

    // Event: Emitted when a data packet (chunk) is available
    stream.on('data', (chunk) => {
        res.write(chunk); // Efficiently send small packets of binary data
    });

    // Event: Emitted if the file cannot be found or read
    stream.on('error', (err) => {
        res.status(404).json({ error: err.message, message: "Video not found" });
    });

    // Event: Emitted when the entire file has been streamed
    stream.on('end', () => {
        res.end(); // Finalize the response connection
    });
};

/**
 * Retrieves a list of all video records stored in the database.
 */
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        console.log('error from controllers', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Fetches all metadata for a specific video using its MongoDB Object ID.
 */
export const getVideoDetails = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        console.log('error from controllers', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Updates an existing video record's information (likes, description, etc.).
 */
export const updateVideoDetails = async (req, res) => {
    try {
        // Find by ID and apply updates from request body. 'new: true' returns the updated doc.
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(video);
    } catch (err) {
        console.log('error from controllers', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Deletes a video record from the metadata collection.
 * Note: High-level implementation might also need to delete physical files from GridFS.
 */
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        console.log('error from controllers', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Filters videos based on keyword searching and category tags.
 */
export const getFilteredVideos = async (req, res) => {
    try {
        const { searchSentence, category } = req.query;
        let query = {};

        // If no filter is applied, return everything
        if (!searchSentence && !category) {
            const allVideos = await Video.find();
            return res.status(200).json(allVideos);
        }

        // Apply a case-insensitive regex search for keywords in the title
        if (searchSentence) {
            query.title = { $regex: searchSentence, $options: 'i' };
        }

        // Apply exact match filtering if a specific category is selected (and isn't 'All')
        if (category && category !== "All") {
            query.category = category;
        }

        const videos = await Video.find(query);
        res.status(200).json(videos);
    } catch (err) {
        console.log('error from controllers', err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * Retrieves all videos uploaded by a specific user/channel.
 */
export const getVideosByChannel = async (req, res) => {
    try {
        const { channel } = req.query;

        // Ensure the channel name is provided in the query params
        if (!channel) {
            return res.status(400).json({ error: "Channel parameter is required" });
        }

        // Search for videos matching the canal (normalized to lowercase)
        const videos = await Video.find({ channel: channel.toLowerCase() });
        res.status(200).json(videos);
    } catch (err) {
        console.log('error from controllers', err);
        res.status(500).json({ error: err.message });
    }
};