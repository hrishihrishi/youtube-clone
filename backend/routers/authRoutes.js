import express from 'express';
const router = express.Router();
import { signUp, signInUsingEmailAndPassword, signOut, getUserDetails } from '../controllers/authController.js';
import { protect } from '../middlewares/authmiddleware.js';

// Auth Routes
router.post('/signup', signUp);
router.post('/signin', signInUsingEmailAndPassword);

// Protected Auth Routes
router.post('/signout', protect, signOut);
router.post('/getUserDetails', protect, getUserDetails);

export default router;