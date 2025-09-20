const { spawn } = require('child_process');
const path = require('path');

exports.generateAutomatedReport = (req, res) => {
    const { projectId } = req.body;
    
    if (!projectId) {
        return res.status(400).json({ 
            success: false, 
            message: 'Project ID is required' 
        });
    }
    
    console.log(`[Server] Received request to launch automation for Project #${projectId}`);

    // This is the path to your script. Make sure this path is correct.
    const scriptPath = path.join(__dirname, '..', 'automation', 'run-playwright.js');

    try {
        // Launch the script as a separate, detached process.
        // This is the key to preventing server crashes.
        const child = spawn('node', [scriptPath, projectId], {
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        // Log any output from the child process for debugging
        child.stdout.on('data', (data) => {
            console.log(`[Playwright Output] ${data.toString()}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`[Playwright Error] ${data.toString()}`);
        });

        child.on('error', (error) => {
            console.error(`[Server] Failed to start automation process:`, error);
        });

        child.unref();

        // Immediately respond to the frontend.
        res.status(202).json({ 
            success: true, 
            message: `Automation process has been launched successfully for Project #${projectId}` 
        });
    } catch (error) {
        console.error(`[Server] Error launching automation:`, error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to launch automation process' 
        });
    }
};