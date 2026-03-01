const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    channel: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isSignedIn: { type: Boolean, default: false },
    subscribersCount: { type: Number, default: 0 },
    subscribedChannels: { type: Array, default: [] },
    history: { type: Array, default: [] },
    likedVideos: { type: Array, default: [] },
    ownVideos: { type: Array, default: [] }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;