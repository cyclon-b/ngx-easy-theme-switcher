import { test, expect } from '@playwright/test';

test.describe('Theme Switcher Demo App', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should load the app and display the title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Easy Theme Switcher');
  });

  test('should display all four demo cards', async ({ page }) => {
    const cards = page.locator('.demo-card');
    await expect(cards).toHaveCount(4);
  });

  test('should have default light theme on load', async ({ page }) => {
    const dataTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(dataTheme).toBe('light');
  });

  test('should switch to dark theme when clicking a toggle button', async ({ page }) => {
    // Click the first toggle button (in the header)
    const toggleBtn = page.locator('.ets-toggle-btn').first();
    await toggleBtn.click();

    const dataTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(dataTheme).toBe('dark');
  });

  test('should toggle back to light theme', async ({ page }) => {
    const toggleBtn = page.locator('.ets-toggle-btn').first();

    // Click to dark
    await toggleBtn.click();
    await expect(page.locator('.ets-toggle-btn').first()).toHaveAttribute(
      'aria-label',
      'Switch to light mode'
    );

    // Click back to light
    await toggleBtn.click();
    await expect(page.locator('.ets-toggle-btn').first()).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    );
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    const toggleBtn = page.locator('.ets-toggle-btn').first();
    await toggleBtn.click();

    const storedTheme = await page.evaluate(() =>
      localStorage.getItem('ets-pref-theme')
    );
    expect(storedTheme).toBe('dark');
  });

  test('should apply persisted theme on reload', async ({ page }) => {
    // Toggle to dark
    const toggleBtn = page.locator('.ets-toggle-btn').first();
    await toggleBtn.click();

    // Reload the page
    await page.reload();

    // Should still be dark
    const dataTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(dataTheme).toBe('dark');
  });

  test('multiple toggle buttons should be interactive', async ({ page }) => {
    const toggleButtons = page.locator('.ets-toggle-btn');
    const count = await toggleButtons.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Click the second toggle button (FontAwesome demo card)
    const secondBtn = toggleButtons.nth(1);
    await secondBtn.click();

    const dataTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(dataTheme).toBe('dark');
  });

  test('aria-label updates on toggle click', async ({ page }) => {
    const toggleBtn = page.locator('.ets-toggle-btn').first();

    // Initial label
    await expect(toggleBtn).toHaveAttribute('aria-label', 'Switch to dark mode');

    // After click
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  test('should render SVG custom icon demo', async ({ page }) => {
    // The third demo card uses custom SVG
    const svgCard = page.locator('.demo-card').nth(2);
    await expect(svgCard.locator('.ets-icon--svg')).toBeVisible();
  });

  test('should render Bootstrap icons demo', async ({ page }) => {
    // The fourth demo card uses Bootstrap icons
    const biCard = page.locator('.demo-card').nth(3);
    const icon = biCard.locator('.ets-icon');
    await expect(icon).toHaveClass(/bi/);
  });
});
