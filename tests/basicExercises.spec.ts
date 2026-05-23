import { test, expect, firefox, chromium } from '@playwright/test';

test.describe('homework', () => {
    test('GitHub Sign In', async ({ page }) => {
        // Go to the GitHub page
        await page.goto('https://github.com/');
        // Click the Sign in button
        await page.getByRole('link', { name: 'Sign in' }).click();
        // Add dummy user name and password
        await page
            .getByRole('textbox', { name: 'Username or email address' })
            .fill('team13time@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('heeeheee');
        await page.getByRole('button', { name: 'Sign in' }).click();
        // Assert that an error appears.
        await expect(
            page.getByText('Incorrect username or password.'),
        ).toBeVisible();
    });

    test('Browsers & Browser context', async () => {
        // Launch a Firefox browser
        const browser = await firefox.launch();
        console.log(browser.contexts().length);
        // Create a new Context
        const context = await browser.newContext();
        // Console log the browser contexts' length
        console.log(browser.contexts().length);
        // Create a new page
        const page = await context.newPage();
        // Console log the browser contexts' length
        console.log(browser.contexts().length);
        // Go to the playwright URL
        await page.goto('https://playwright.dev/');
        // Close up the context and browser
        await context.close();
        await browser.close();
    });
});

// Open a describe block and create a test.
test.describe('Context', () => {
    test('Multiple pages', async () => {
        // Launch a Chromium browser
        const browser = await chromium.launch();
        console.log(browser.contexts().length);
        // Create a new Context.
        const context = await browser.newContext();
        // Create a page and go to the Playwright installation URL
        const page1 = await context.newPage();
        await page1.goto('https://playwright.dev/docs/intro');
        // Create a second page and go to the playwright writing tests URL.
        const page2 = await context.newPage();
        await page2.goto('https://playwright.dev/docs/writing-tests');
        // Get the pages of the browser context.
        const pages = context.pages();

        await page1.screenshot({ path: './tests/screenshots/page1.png' });
        await page2.screenshot({ path: './tests/screenshots/page2.png' });
        await browser.close();
    });
});

// Open a describe block, and create a test.
test.describe('Methods', () => {
    test('Pages Methods', async () => {
        // Launch a Firefox browser
        const browser = await firefox.launch();
        // Create a new Context and a new page.
        const context = await browser.newContext();
        const page = await context.newPage();
        // Go to the playwright URL
        await page.goto('https://playwright.dev/');
        // Use the page to take a screenshot.
        await page.screenshot({ path: './tests/screenshots/playwright.png' });
        // Use the page once to console.log “Page loaded!”
        page.once('load', (msg) => {
            console.log('Page loaded!');
        });
        // Got to GitHub URL.
        await page.goto('https://github.com/');
        await page.screenshot({ path: './tests/screenshots/github.png' });
        // Navigate to the previous page in history.
        await page.goBack();
        await browser.close();
    });
});
