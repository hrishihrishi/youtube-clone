const express = require('express');
const router = express.Router();
const { signUp, signInUsingEmailAndPassword, signOut } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signInUsingEmailAndPassword);
router.post('/signout', signOut);

module.exports = router;