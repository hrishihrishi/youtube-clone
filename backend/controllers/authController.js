const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
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

        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;

        // RETURN USER (WITH JWT TOKEN).
        res.status(201).json({ user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'User not created' });
    }
}



exports.signInUsingEmailAndPassword = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // CHECK IF USER EXISTS.
        const user = await User.findOne({ email });

        // ASK USER TO SIGNUP INSTEAD.
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        // VERIFY PASSWORD.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'User not found' });
    }
}



exports.signOut = async (req, res) => {
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