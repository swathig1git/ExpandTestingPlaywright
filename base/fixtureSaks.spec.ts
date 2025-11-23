import { test as baseTest, Page } from "@playwright/test";
import { chromium } from "playwright";

const test = baseTest.extend<{ page: Page }>({
  page: async ({}, use, testInfo) => {
    const browser = await chromium.launch({
      headless: false,
      args: [
        '--start-maximized',          // Reliable maximized/full-like on macOS
        '--disable-web-security',     // Helps with macOS sandbox/fullscreen quirks
        // '--start-fullscreen',      // Uncomment if you want to test it again, but expect issues
      ],
    });

    const context = await browser.newContext({
      viewport: null,  // Essential: disables fixed viewport for full expansion
    });

    const page = await context.newPage();

    // Post-launch maximization (enforces on macOS if flag fails)
    await page.evaluate(() => {
      window.moveTo(0, 0);
      window.resizeTo(screen.availWidth, screen.availHeight);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});  // Fallback to browser fullscreen
      }
    });

   await page.goto('https://www.saksfifthavenue.com/'); 

    //const shopCanadaButton = page.locator("//button[text() = 'SHOP SAKS CANADA']");
    // Start your test immediately — no upfront waiting!
    //await use(page);
    // In parallel: if the popup ever appears in the next 30 seconds, click it
    // await shopCanadaButton.waitFor({ state: "visible", timeout: 60000 })
    //                 .then(async () => {
    //                                   await shopCanadaButton.click();
    //                                   console.log("Canada popup appeared later → clicked!");
    //                     })
    //                 .catch(() => {
    //                               // never appeared — totally fine
    //                       });

    // try {
    //   await shopCanadaButton.waitFor({ state: "visible", timeout: 8000 });
    //   await shopCanadaButton.click();
    //   console.log("Popup appeared and OK clicked");
    // } catch {
    //   console.log("Popup did not appear, continuing");
    // }

    const shopCanadaButton = page.locator("//button[text() = 'SHOP SAKS CANADA']");
    // Start your test immediately — no upfront waiting!

    (async () => {

    while (true) {
        if (await shopCanadaButton.isVisible({ timeout: 0 })) {
          await shopCanadaButton.click();
          break;
        }
        //console.log("waiting");
        await page.waitForTimeout(200); // small poll, not blocking
      }
    })();
    await use(page);
    // Cleanup
    await context.close();
    await browser.close();
  },
});

export { test };
export const expect = test.expect;