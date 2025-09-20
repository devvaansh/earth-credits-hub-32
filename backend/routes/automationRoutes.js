const express = require('express');
const router = express.Router();
const { generateAutomatedReport } = require('../controllers/automationController');
// const authMiddleware = require('../middleware/auth'); // Temporarily commented out

// @route   POST /api/automation/generate-report
// @desc    Generates a pre-verification report using Playwright
// @access  Public (for now)
router.post('/generate-report', generateAutomatedReport); // Temporarily removed authMiddleware

module.exports = router;