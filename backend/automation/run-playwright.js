const { chromium } = require('playwright');

async function runAutomation() {
    const projectId = process.argv[2];
    if (!projectId) {
        console.error('Error: No Project ID provided.');
        return;
    }

    let browser;
    try {
        console.log(`[Playwright] Starting STABLE script for Project #${projectId}`);
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.setViewportSize({ width: 1300, height: 800 });

        // --- STEP 1: LOGIN ---
        await page.goto('https://earth-credits-hub-32-cn42.vercel.app/login');
        await page.getByRole('textbox', { name: 'Email' }).fill('verifier@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('verifier@example.com');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // --- STEP 2: WAIT FOR THE DASHBOARD TO BE READY ---
        // This is the most critical new step.
        // We wait for a unique element on your dashboard to appear before doing anything else.
        // I am guessing a selector below. If it fails, you MUST replace it with one from your site.
        // See instructions below the code block on how to find this.
        console.log('[Playwright] Login successful. Waiting for the project queue to load...');
        const dashboardTableLocator = page.locator('.table'); // <-- GUESSING a class for your table
        await dashboardTableLocator.waitFor({ state: 'visible', timeout: 15000 }); // Wait up to 15 seconds
        console.log('[Playwright] Project queue is visible.');

        // --- STEP 3: CLICK THE PROJECT ---
        // Now that we know the table is loaded, we can safely find and click the button.
        // This locator finds the first button in the 7th column of the table.
        const projectActionLocator = dashboardTableLocator.locator('td:nth-child(7) button').first();
        await projectActionLocator.click();

        await page.waitForURL(`**/project/${projectId}`);
        console.log(`[Playwright] Successfully navigated to project page for ${projectId}.`);

        // We will stop here for now. Let's confirm this works before adding visuals.
        await page.waitForTimeout(3000); // Pause on the final page for 3 seconds

    } catch (error) {
        console.error(`[Playwright] SCRIPT FAILED for ${projectId}:`, error);
    } finally {
        if (browser) {
            await browser.close();
            console.log('[Playwright] Browser closed.');
        }
    }
}

runAutomation();