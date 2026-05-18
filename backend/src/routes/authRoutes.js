const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// This route already exists
router.post('/register', authController.register);

// This is the new route you are adding
router.post('/login', authController.login);

module.exports = router;