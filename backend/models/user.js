const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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


userSchema.pre('save', async function () {
    try {
        if (!this.isModified('password')) {
            return;
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log('Error while hashing password', error);
        throw error;
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;