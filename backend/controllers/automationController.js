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
    
    const scriptPath = path.join(__dirname, '..', 'automation', 'run-playwright.js');
    
    const child = spawn('node', [scriptPath, projectId], {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();

    res.status(202).json({ 
        success: true, 
        message: 'Automation process has been launched successfully.' 
    });
};