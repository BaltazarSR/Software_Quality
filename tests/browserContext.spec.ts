import { test, expect, firefox } from '@playwright/test';

test.describe('Context', () => {

  test('should create a new browser context', async () => {
    const browser = await firefox.launch();
    console.log(browser.contexts().length);
    const page = await browser.newPage();
    await page.goto('https://playwright.dev/');
    console.log(browser.contexts().length);
    await page.screenshot({ path: './tests/screenshots/page.png'})
    await browser.close();
  });

  test('should create multiple contexts', async () => {
    const browser = await firefox.launch();
    console.log(browser.contexts().length);
    const page1 = await browser.newPage();
    await page1.goto('https://playwright.dev/');
    const page2 = await browser.newPage();
    await page2.goto('https://playwright.dev/docs/intro');
    console.log(browser.contexts().length);
    await page1.screenshot({ path: './tests/screenshots/page1.png'})
    await page2.screenshot({ path: './tests/screenshots/page2.png'})
    await browser.close();
  });
});


test.describe('Methods', () => {
  test('navigate using history', async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto('https://playwright.dev/');
    page.once('load', msg => {
        console.log('Page loaded!');
    });
    await page.goto('https://github.com/');
    await page.screenshot({ path: './tests/screenshots/github.png'})
    await page.goBack()
    await page.screenshot({ path: './tests/screenshots/playwright.png'})
    await browser.close();
  });
});

test.describe('Locators', () => {
  test('should use 7 locators', async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto('https://mercadolibre.com.mx/');
    page.once('load', msg => {
        console.log('Page loaded!');
    });
    await page.screenshot({ path: './tests/screenshots/mercadolibre.png'})

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
