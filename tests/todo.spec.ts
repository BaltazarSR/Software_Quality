import { test, expect, firefox } from '@playwright/test';

// use LOCATORS, TAGS, ACTIONS, ASSERTIONS, SCREENSHOTS

test.describe('Playwright todos', () => {

    const todoItems = ['Buy milk', 'Walk the dog', 'Read a book'];

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        const todoInput = page.getByPlaceholder('What needs to be done?');

        for (const item of todoItems) {
            await todoInput.fill(item);
            await todoInput.press('Enter');
        }
    });

    test('Input should be visible', { tag: '@smoke' }, async ({ page }) => {
        await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    });

    test('3 tasks should be added', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
        await page.screenshot({ path: './tests/screenshots/tasks_added.png'})
        await expect(page.locator('.todo-list li')).toHaveCount(3);
        await expect(page.getByText(todoItems[0])).toBeVisible();
        await expect(page.getByText(todoItems[1])).toBeVisible();
        await expect(page.getByText(todoItems[2])).toBeVisible();
    });
    
    test('complete should not show any tasks', { tag: '@regression' }, async ({ page }) => {
        const completedButton = page.getByRole('link', { name: /Completed/i });
        const allButton = page.getByRole('link', { name: /All/i });

        await expect(completedButton).toBeVisible();
        await expect(allButton).toBeVisible();

        await completedButton.click();
        await expect(page.locator('.todo-list li')).toHaveCount(0);
        await page.screenshot({ path: './tests/screenshots/tasks_completed.png'})

        await allButton.click();
        await expect(page.locator('.todo-list li')).toHaveCount(3);
        await expect(page.getByText(todoItems[0])).toBeVisible();
        await page.getByText(todoItems[0])

        const toggle = page.locator('li')
            .filter({ has: page.getByTestId('todo-title').and(page.getByText('Buy milk')) })
            .getByLabel('Toggle Todo');
        await toggle.click();

        await completedButton.click();
        await expect(page.locator('.todo-list li')).toHaveCount(1);
        await page.screenshot({ path: './tests/screenshots/tasks_completed_after.png'})
    });

    test('delete should remove the task', { tag: '@regression' }, async ({ page }) => {

        await expect(page.locator('.todo-list li')).toHaveCount(3);
                                           
        const todoItem = page.locator('li').filter({ has: page.getByTestId('todo-title').and(page.getByText('Buy milk')) });
        await todoItem.hover();
        await todoItem.getByLabel('Delete').click();

        await expect(page.locator('.todo-list li')).toHaveCount(2);
        await page.screenshot({ path: './tests/screenshots/tasks_deleted.png'})
    });

    test('clear completed should delete all tasks', { tag: '@regression' }, async ({ page }) => {
        await expect(page.locator('.todo-list li')).toHaveCount(3);

        for (const item of todoItems) {
            const toggle = page.locator('li')
                .filter({ has: page.getByTestId('todo-title').and(page.getByText(item)) })
                .getByLabel('Toggle Todo');
            await toggle.click();
        };

        const clearButton = page.getByRole('button', { name: /Clear Completed/i });
        await expect(clearButton).toBeVisible();
        await clearButton.click();

        await expect(page.locator('.todo-list li')).toHaveCount(0);
        await page.screenshot({ path: './tests/screenshots/tasks_cleared.png'})
    });

});