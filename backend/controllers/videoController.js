const mongoose = require('mongoose');
const Video = require('../models/video');

// We need a reference to the GridFS bucket
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    // GridFSBucket is the modern MongoDB driver method for handling files
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
});

// 1. STORE VIDEO METADATA
exports.uploadVideoData = async (req, res) => {
    try {
        if (!req.files || !req.files['video'] || !req.files['thumbnail']) {
            return res.status(400).json({ error: "Missing video or thumbnail file" });
        }

        const newVideo = new Video({
            ...req.body,
            video: req.files['video'][0].filename,     // Storing the GridFS filename
            thumbnail: req.files['thumbnail'][0].filename,
        });

        // save the video to the database
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error:err.message});
    }
};

// 2. STREAM VIDEO FILE
exports.streamVideo = (req, res) => {
    // openDownloadStreamByName looks for the file in the chunks collection
    const stream = gfs.openDownloadStreamByName(req.params.filename);

    stream.on('data', (chunk) => {
        res.write(chunk); // Sending small packets of data to the client
    });

    stream.on('error', () => {
        res.status(404).json({ message: "Video not found" });
    });

    stream.on('end', () => {
        res.end(); // Closing connection once stream is finished
    });
};