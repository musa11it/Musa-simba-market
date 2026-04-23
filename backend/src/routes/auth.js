const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken, getCurrentUser } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', verifyToken, getCurrentUser, authController.getCurrentUser);
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
