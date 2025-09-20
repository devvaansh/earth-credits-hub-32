const { spawn } = require('child_process');
const path = require('path');

exports.generateAutomatedReport = (req, res) => {
    const { projectId } = req.body;
    console.log(`[Server] Received request to launch automation for Project #${projectId}`);

    // This is the path to your script. Make sure this path is correct.
    const scriptPath = path.join(__dirname, '..', 'automation', 'run-playwright.js');

    // Launch the script as a separate, detached process.
    // This is the key to preventing server crashes.
    const child = spawn('node', [scriptPath, projectId], {
        detached: true,
        stdio: 'ignore'
    });

    child.unref();

    // Immediately respond to the frontend.
    res.status(202).json({ 
        success: true, 
        message: 'Automation process has been launched successfully.' 
    });
};