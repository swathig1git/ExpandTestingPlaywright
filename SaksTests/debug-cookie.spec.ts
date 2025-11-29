// debug-saks-cookies.ts  (run with: npx playwright test this-file.spec.ts)
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('debug Saks geo cookies', async () => {
    test.setTimeout(220000); // 120 seconds
  const browser = await chromium.launch({ headless: false });  // visible so you can see popup
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  console.log('=== BEFORE GOTO: Initial cookies ===');
  await context.addCookies([]); // clear any existing

  await page.goto('https://www.saksfifthavenue.com/');

  // Wait a bit for geo detection (popup might appear here)
  await page.waitForTimeout(5000);

  // Check if popup appeared (and manually click if needed for comparison)
  const popup = page.locator('button:has-text("SHOP SAKS CANADA")');
  try {
    await popup.waitFor({ state: 'visible', timeout: 10000 });
    console.log('POPUP APPEARED → Manually click "Stay on US" and run page.evaluate again below');
    // Uncomment next line if you want auto-click (but for debug, manual is better)
    // await popup.click();
  } catch {
    console.log('No popup → good, but cookies should still be set');
  }

  // DUMP ALL COOKIES BEFORE ANY INTERACTION
  console.log('\n=== COOKIES AFTER PAGE LOAD (before any click) ===');
  const cookiesBefore = await context.cookies();
  cookiesBefore.forEach(cookie => {
    console.log(`${cookie.name}: ${cookie.value} (domain: ${cookie.domain}, path: ${cookie.path}, expires: ${cookie.expires})`);
  });

  // Now, if popup appeared, MANUALLY click "Stay on US site" in the browser
  // Then run this again (or add to code):
  await page.waitForTimeout(3000); // time to click manually

  console.log('\n=== COOKIES AFTER MANUAL DISMISS (this is what you want) ===');
  const cookiesAfter = await context.cookies();
  cookiesAfter.forEach(cookie => {
    if (cookie.name.toLowerCase().includes('geo') || 
        cookie.name.toLowerCase().includes('location') || 
        cookie.name.toLowerCase().includes('redirect') ||
        cookie.name.startsWith('_') || 
        cookie.name.includes('saks')) {  // filter to relevant ones
      console.log(`*** POTENTIAL GEO COOKIE: ${cookie.name}: ${cookie.value} ***`);
    } else {
      console.log(`${cookie.name}: ${cookie.value}`);
    }
  });

  // Also dump localStorage (popups often use this too)
  console.log('\n=== LOCALSTORAGE KEYS (geo-related) ===');
  const localStorage = await page.evaluate(() => Object.entries(localStorage));
  localStorage.forEach(([key, value]) => {
    if (key.toLowerCase().includes('geo') || key.toLowerCase().includes('canada') || key.includes('saks')) {
      console.log(`*** LOCALSTORAGE: ${key}: ${value} ***`);
    }
  });

  // Network tab simulation: Listen for geo API calls
  page.on('request', request => {
    if (request.url().includes('geo') || request.url().includes('location')) {
      console.log(`\n*** GEO NETWORK REQUEST: ${request.method()} ${request.url()}`);
      console.log('Headers:', request.headers());
    }
  });

  await page.waitForTimeout(10000); // keep open to inspect
  await browser.close();
});