import { test, expect, firefox } from '@playwright/test';

test.describe('example describe block', () => {
    test('first', async ({ page }) => {
        await page.goto('https://github.com/');
        await expect(page).toHaveTitle(/GitHub/);
    });

    test('google search playwright', async ({ page }) => {
        await page.goto('https://www.google.com/');
        await page.getByRole('combobox', { name: 'Buscar' }).fill('playwright');
        // await page.getByRole('button', { name: 'Buscar con Google' }).click();
        await page.keyboard.press('Enter');
        await expect(
            page.getByRole('link', {
                name: 'Playwright: Fast and reliable end-to-end testing for modern web apps ',
            }),
        ).toBeVisible();
        await page
            .getByRole('link', {
                name: 'Playwright: Fast and reliable end-to-end testing for modern web apps ',
            })
            .click();
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('has title', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
    });
});

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
        page.getByRole('heading', { name: 'Installation' }),
    ).toBeVisible();
});

test.describe('homework', () => {
    test('github bad login', async ({ page }) => {
        await page.goto('https://github.com/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page
            .getByRole('textbox', { name: 'Username or email address' })
            .fill('baltatime@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('heeeheee');

        await page.getByRole('button', { name: 'Sign in' }).click();

        await expect(
            page.getByText('Incorrect username or password.'),
        ).toBeVisible();
    });

    test('firefox', async () => {
        const browser = await firefox.launch();
        console.log(browser.contexts().length);
        const context = await browser.newContext();
        console.log(browser.contexts().length);
        const page = await context.newPage();
        await page.goto('https://playwright.dev/');
        await context.close();
        await browser.close();
    });
});
