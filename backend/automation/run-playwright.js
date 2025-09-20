// runAutomation.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Get project ID from command line arguments
const projectId = process.argv[2];
console.log(`[Playwright] Starting automation for Project ID: ${projectId}`);

// --- Your custom styles and scripts remain here ---
const customCSS = `
  html {
    background: linear-gradient(-45deg, #0a0328, #360b41, #022c3b, #011322);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    font-family: 'Courier New', Courier, monospace !important;
  }
  @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  * { color: #00ffcc !important; background-color: rgba(14, 2, 36, 0.2) !important; border: 1px solid rgba(0, 255, 204, 0.3) !important; border-radius: 4px; backdrop-filter: blur(2px); text-shadow: 0 0 5px #00ffcc; transition: all 0.2s ease-in-out; }
  *:hover { box-shadow: 0 0 15px rgba(0, 255, 204, 0.8), inset 0 0 5px rgba(0, 255, 204, 0.5) !important; background-color: rgba(14, 2, 36, 0.5) !important; }
  img, video, svg { border: none !important; }
  body { cursor: crosshair; }
  ::-webkit-scrollbar { display: none; }
`;
const customJS = `
  console.log('[AI] Neuro-Visual Overlay Injected.');
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed'; canvas.style.top = '0'; canvas.style.left = '0'; canvas.style.width = '100vw'; canvas.style.height = '100vh'; canvas.style.zIndex = '-1'; canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  let particles = [];
  for (let i = 0; i < 50; i++) { particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, size: Math.random() * 2 + 1 }); }
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > canvas.width) p.vx *= -1; if (p.y < 0 || p.y > canvas.height) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0, 255, 204, 0.5)'; ctx.fill(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
`;

// --- Main Playwright script ---
(async () => {
  let browser;
  let context;
  
  try {
    console.log('[Playwright] Starting automation…');
    
    // Check if auth.json exists
    const authPath = path.join(__dirname, '..', '..', 'auth.json');
    if (!fs.existsSync(authPath)) {
      console.error('[Playwright] ERROR: auth.json not found. Please ensure you have saved authentication state.');
      process.exit(1);
    }
    
    // =========================================================================
    // === ADD slowMo TO SLOW DOWN THE SCRIPT (in milliseconds) ===
    browser = await chromium.launch({
      headless: false,
      slowMo: 2000, // Adjust this value to control the speed
    });
    console.log('[Playwright] Browser launched successfully');
    // =========================================================================

    // Load the saved auth state to skip login
    context = await browser.newContext({ storageState: authPath });
    console.log('[Playwright] Context created with auth state');

    const page = await context.newPage();
    await page.setViewportSize({ width: 1300, height: 800 });
    console.log('[Playwright] Page created and viewport set');

    // Go directly to the page that requires login
    console.log('[Playwright] Navigating to verifier dashboard...');
    await page.goto(
      'https://earth-credits-hub-32-cn42.vercel.app/verifier-dashboard',
      { waitUntil: 'networkidle' }
    );
    console.log('[Playwright] Successfully navigated to dashboard');

    // Inject the CSS and JS
    console.log('[Playwright] Injecting custom visuals...');
    await page.addStyleTag({ content: customCSS });
    await page.addScriptTag({ content: customJS });
    console.log('[Playwright] Visuals injected successfully!');

    // The rest of your automation script will now run more slowly
    console.log('[Playwright] Starting interaction with project table...');
    
    try {
      await page
        .getByRole('row', { name: 'Mangrove Restoration Project' })
        .getByRole('button')
        .nth(1)
        .click();
      console.log('[Playwright] Clicked on project row');
    } catch (error) {
      console.error('[Playwright] Could not find Mangrove Restoration Project row:', error.message);
      // Try to take a screenshot for debugging
      await page.screenshot({ path: 'debug-screenshot.png' });
      console.log('[Playwright] Debug screenshot saved as debug-screenshot.png');
    }
    
    try {
      await page.getByRole('tab', { name: 'Documents' }).click();
      console.log('[Playwright] Clicked Documents tab');
      
      await page.getByText('project_methodology.docx').click();
      console.log('[Playwright] Clicked project methodology document');
      
      await page.getByText('field_photos_2025.zip').click();
      console.log('[Playwright] Clicked field photos document');
      
      await page.getByRole('tab', { name: 'Map & Imagery' }).click();
      console.log('[Playwright] Clicked Map & Imagery tab');
      
      await page.locator('html').click();
      console.log('[Playwright] Clicked on html element');
    } catch (error) {
      console.error('[Playwright] Error during document interaction:', error.message);
      await page.screenshot({ path: 'debug-error-screenshot.png' });
    }

    await page.waitForTimeout(5000);
    console.log('[Playwright] Automation completed successfully');
    
  } catch (error) {
    console.error('[Playwright] SCRIPT FAILED:', error);
    console.error('[Playwright] Error stack:', error.stack);
    process.exit(1);
  } finally {
    try {
      if (context) {
        await context.close();
        console.log('[Playwright] Context closed');
      }
      if (browser) {
        await browser.close();
        console.log('[Playwright] Browser closed');
      }
    } catch (closeError) {
      console.error('[Playwright] Error closing browser:', closeError);
    }
  }
})();