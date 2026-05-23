import { test, expect, firefox } from '@playwright/test';

test.describe('Locators', () => {
    test('Should use 7 locators', async () => {
        const browser = await firefox.launch();
        const page = await browser.newPage();
        // Go to the page of MercadoLibre
        await page.goto('https://mercadolibre.com.mx/');
        page.once('load', (msg) => {
            console.log('Page loaded!');
        });
        await page.screenshot({ path: './tests/screenshots/mercadolibre.png' });
        // In a test block, use the 7 recommended locators to find elements on the page.
        await page.getByRole('button', { name: /Crea tu cuenta/i }).isVisible();
        await page.getByTestId('action:understood-button').isVisible();
        await page.getByAltText('REACONDICIONADOS, HASTA 50% OFF').isVisible();
        await page.getByText('VIVE MERCADO LIBRE COMO UN EXPERTO').isVisible();
        await page.getByLabel('0 productos en tu carrito').isVisible();
        await page.getByPlaceholder('Estoy buscando…').isVisible();
        await page.getByTitle('Ofertas').isVisible();
        await browser.close();
    });
});

test.describe('Playwright todos', () => {
    // Couldn't find title= or alt= in this webpage, sorry Pepe

    const todoItems = ['Buy Milk', 'Walk the dog', 'Read a book'];

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        const todoInput = page.getByPlaceholder('What needs to be done?');

        for (const item of todoItems) {
            await todoInput.fill(item);
            await todoInput.press('Enter');
        }
    });

    test('Input should be visible', { tag: '@smoke' }, async ({ page }) => {
        await expect(
            page.getByPlaceholder('What needs to be done?'),
        ).toBeVisible();
        await expect(
            page.getByPlaceholder('What needs to be done?'),
        ).toBeEmpty();
    });

    test(
        '3 tasks should be added',
        { tag: ['@smoke', '@regression'] },
        async ({ page }) => {
            await page.screenshot({
                path: './tests/screenshots/tasks_added.png',
            });
            await expect(page.locator('.todo-list li')).toHaveCount(3);
            await expect.soft(page.getByText(todoItems[0])).toBeVisible();
            await expect.soft(page.getByText(todoItems[1])).toBeVisible();
            await expect.soft(page.getByText(todoItems[2])).toBeVisible();

            const count = await page.locator('.todo-list li').count();
            expect(count).toBe(3);
        },
    );

    test(
        'complete should not show any tasks',
        { tag: '@regression' },
        async ({ page }) => {
            test.slow();

            const completedButton = page.getByRole('link', {
                name: /Completed/i,
            });
            const allButton = page.getByRole('link', { name: /All/i });

            await expect(completedButton).toBeVisible();
            await expect(allButton).toBeVisible();

            await completedButton.click();
            await expect(page.locator('.todo-list li')).toHaveCount(0);
            await page.screenshot({
                path: './tests/screenshots/tasks_completed.png',
            });

            await allButton.click();
            await expect(page.locator('.todo-list li')).toHaveCount(3);
            await expect(page.getByText(todoItems[0])).toBeVisible();

            const toggle = page
                .locator('li')
                .filter({
                    has: page
                        .getByTestId('todo-title')
                        .and(page.getByText(todoItems[0])),
                })
                .getByLabel('Toggle Todo');

            await toggle.check();
            await expect(toggle).toBeChecked();

            await completedButton.click();
            await expect(page.locator('.todo-list li')).toHaveCount(1);
            await page.screenshot({
                path: './tests/screenshots/tasks_completed_after.png',
            });
        },
    );

    test(
        'delete should remove the task',
        { tag: '@regression' },
        async ({ page }) => {
            const initialCount = await page.locator('.todo-list li').count();
            expect(initialCount).toBe(3);

            const todoItem = page.locator('li').filter({
                has: page
                    .getByTestId('todo-title')
                    .and(page.getByText(todoItems[0])),
            });

            await todoItem.hover();
            await todoItem.getByLabel('Delete').click();

            await expect(page.locator('.todo-list li')).toHaveCount(2);

            await expect(page.getByText(todoItems[0])).not.toBeVisible();

            await page.screenshot({
                path: './tests/screenshots/tasks_deleted.png',
            });
        },
    );

    test(
        'clear completed should delete all tasks',
        { tag: '@regression' },
        async ({ page }) => {
            await expect(page.locator('.todo-list li')).toHaveCount(3);

            for (const item of todoItems) {
                const toggle = page
                    .locator('li')
                    .filter({
                        has: page
                            .getByTestId('todo-title')
                            .and(page.getByText(item)),
                    })
                    .getByLabel('Toggle Todo');

                await toggle.check();
            }

            const clearButton = page.getByRole('button', {
                name: /Clear Completed/i,
            });
            await expect(clearButton).toBeVisible();
            await clearButton.click();

            await expect(page.locator('.todo-list li')).toHaveCount(0);

            await expect(page.locator('.todo-count')).not.toBeVisible();

            await page.screenshot({
                path: './tests/screenshots/tasks_cleared.png',
            });
        },
    );

    test.fail('edit task should update the task name', async ({ page }) => {
        const todoItem = page.locator('li').filter({
            has: page
                .getByTestId('todo-title')
                .and(page.getByText(todoItems[1])),
        });

        await todoItem.dblclick();

        const editInput = todoItem.getByRole('textbox');
        await editInput.fill('Buy oat milk');
        await editInput.press('Enter');

        await expect(page.getByText('Buy oat milk')).toBeVisible();
        await expect(page.getByText('Buy milk')).not.toBeVisible();
    });
});
