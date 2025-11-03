import { test, expect } from '@playwright/test';

test('simulate offline mode', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go online and open a page
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  console.log('Page loaded online');

  // Turn offline mode ON
  await context.setOffline(true);
  console.log('Browser is now offline');

  // Try a fetch that will fail
  const result = await page.evaluate(async () => {
    try {
      await fetch('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
      return '✅ Unexpected success';
    } catch (err) {
      return `❌ Failed to fetch as expected: ${err.message}`;
    }
  });

  console.log(result);

  // Assert that the network failure occurred
  expect(result).toContain('Failed to fetch');

  // Turn online mode back on
  await context.setOffline(false);
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  console.log('Browser back online successfully');
});
