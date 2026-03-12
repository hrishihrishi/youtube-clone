import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Handles new user registration (Sign Up).
 * Validates existence, creates a user, and returns a session token.
 */
export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Basic validation for required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // IF USER EXISTS RETURN.
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists try to login" });

        // ELSE CREATE USER.
        const user = await User.create({
            username,
            email,
            password,
            channel: username
        });

        // Generate a JWT for immediate login after signup
        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;

        // Return successfully created user along with the access token
        res.status(201).json({ user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'User not created' });
    }
}

/**
 * Handles user authentication (Sign In).
 * Compares passwords and returns a JWT if valid.
 */
export const signInUsingEmailAndPassword = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // Find the user by their email address
        const user = await User.findOne({ email });

        // If no user is found, suggest signing up
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found try to signup' });
        }

        // Compare the provided plain-text password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a fresh session JWT token
        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'User not found' });
    }
}

/**
 * Handles user log out.
 * Resets the session status in the database.
 */
export const signOut = async (req, res) => {
    try {
        const { email } = req.body;
        // SET USER IS SIGNED IN TO FALSE.
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isSignedIn = false;
        await user.save();

        // REMOVE JWT TOKEN.
        user.token = null;
        res.status(200).json({ user, message: 'User signed out successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

/**
 * Fetches data for a specific user based on their email.
 */
export const getUserDetails = async (req, res) => {
    try {
        const { email } = req.body;
        // Query the database for user profile and settings
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found while fetching getUserDetails");
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}