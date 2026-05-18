const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController'); // Import company controller
const authMiddleware = require('../middleware/authMiddleware'); // Import our "guard"
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Import our file upload handler

// --- Define Company Routes ---

// Create a new company profile
router.post(
  '/register',
  authMiddleware,
  companyController.createCompanyProfile
);

// Get the user's company profile
router.get('/profile', authMiddleware, companyController.getCompanyProfile);

// Upload a company logo
router.post(
  '/upload-logo',
  authMiddleware,
  uploadMiddleware.single('logo'), // 'logo' is the field name for the file
  companyController.uploadLogo
);

// Update the user's company profile
router.put('/profile', authMiddleware, companyController.updateCompanyProfile);

module.exports = router;
