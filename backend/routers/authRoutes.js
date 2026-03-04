const express = require('express');
const router = express.Router();
const { signUp, signInUsingEmailAndPassword, signOut, getUserDetails } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signInUsingEmailAndPassword);
router.post('/signout', signOut);
router.post('/getUserDetails', getUserDetails);

module.exports = router;