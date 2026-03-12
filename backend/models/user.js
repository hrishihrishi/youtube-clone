import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Bcrypt for secure password hashing

/**
 * User Schema definition for storing user credentials and profile data.
 * Includes fields for authentication, channel details, and activity tracking.
 */
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


/**
 * Mongoose Middleware: Runs before a user document is saved to the database.
 * If the password has been modified, it salts and hashes the password for security.
 */
userSchema.pre('save', async function () {
    try {
        // Skip hashing if password field is not changed (e.g., updating username)
        if (!this.isModified('password')) {
            return;
        }
        // Generate a random salt with 10 rounds of processing
        const salt = await bcrypt.genSalt(10);
        // Hash the password combined with the salt
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log('Error while hashing password', error);
        throw error;
    }
});

const User = mongoose.model('User', userSchema);
export default User;