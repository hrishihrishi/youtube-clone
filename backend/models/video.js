const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: {type: Date, default: Date.now, unique: true},
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    video: {type: String, required: true},
    channel: {type: String, required: true, lowercase: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    views: {type: Number, default: 0},
    comments: [{
        username: { type: String, required: true },
        comment: { type: String, required: true },
        dateTime: { type: Date, default: Date.now }
    }],
    dateTime: {type: Date, default: Date.now}
})

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;