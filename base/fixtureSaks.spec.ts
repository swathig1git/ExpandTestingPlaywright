import { test as baseTest, Page } from "@playwright/test";
import { chromium } from "playwright";
import { SaksDesignerBrandListPage } from './../SaksPageObjects/SaksDesignerBrandListPage';
import { SaksHomePage } from './../SaksPageObjects/SaksHomePage';
import { SaksProductDisplayPage } from '../SaksPageObjects/SaksProductDisplayPage';
import { SaksProductFilterPage } from '../SaksPageObjects/SaksProductFilterPage';

const test = baseTest.extend<{
  page: Page;
  popUpOver: { value: boolean };
  discountPopupClosed: { value: boolean };
  cookiePopupClosed: { value: boolean };
  homePage:SaksHomePage;
  pdp: SaksProductDisplayPage;
  designerList: SaksDesignerBrandListPage;
  filters: SaksProductFilterPage;

}>({
  // ---------- shared flag fixture ----------
  popUpOver: async ({}, use) => {
    const flag = { value: false };   // initial = false
    await use(flag);
  },
    // ---------- shared flag fixture ----------
  discountPopupClosed: async ({}, use) => {
    const flag = { value: false };   // initial = false
    await use(flag);
  },

      // ---------- shared flag fixture ----------
  cookiePopupClosed: async ({}, use) => {
    const flag = { value: false };   // initial = false
    await use(flag);
  },

  // ---------- page fixture ----------
  page: async ({ popUpOver,  discountPopupClosed, cookiePopupClosed}, use) => {
    const browser = await chromium.launch({
      headless: false,
      args: [
        '--start-maximized',
      ],
    });


    

    const context = await browser.newContext({
      viewport: null,
    });

    const page = await context.newPage();

    await page.evaluate(() => {
      window.moveTo(0, 0);
      window.resizeTo(screen.availWidth, screen.availHeight);
      document.documentElement.requestFullscreen?.().catch(() => {});
    });

    await page.goto("https://www.saksfifthavenue.com/");

//     await page.addInitScript(() => {
//   // Kill OneTrust before it initializes
//   Object.defineProperty(window, 'OnetrustActiveGroups', { value: '', writable: false });
//   Object.defineProperty(window, 'OptanonActiveGroups', { value: '', writable: false });

//   // Override the init function
//   (window as any).Optanon = { ToggleInfoDisplay: () => {} };
//   (window as any).OneTrust = { RejectAll: () => {} };

//   // Remove banner if it somehow appears
//   const removeBanner = () => {
//     document.querySelector('#onetrust-consent-sdk')?.remove();
//     document.querySelector('#onetrust-banner-sdk')?.remove();
//   };
//   removeBanner();
//   new MutationObserver(removeBanner).observe(document, { childList: true, subtree: true });
// });


    const shopCanadaButton = page.locator("//button[text() = 'SHOP SAKS CANADA']");
    const rejectCookiesButton = page.locator("//button[@id='onetrust-reject-all-handler']");
    const discountCloseButton = page.locator("//button[@aria-label='Close dialog']");

    // Non-blocking watcher for the popup
  (async () => {
      try {
        while (true) {
          if (page.isClosed()) return;
          const visibleShopCanada = await shopCanadaButton.isVisible().catch(() => false);
          if (visibleShopCanada) {
            await shopCanadaButton.click().catch(() => {});
            popUpOver.value = true;
            return;
          }
          await page.waitForTimeout(200).catch(() => {});
        }
    } catch {
        // Swallow any late errors when closing
            }
  })();

  (async () => {
      try {
        while (true) {
          if (page.isClosed()) return;
          const visibleRejectCookies = await rejectCookiesButton.isVisible().catch(() => false);
          if (visibleRejectCookies) {
          await rejectCookiesButton.click().catch(() => {});
          cookiePopupClosed.value = true;
          console.log("Cookies closed");
          //await rejectCookiesButton.evaluate((el: HTMLElement) => el.click()).catch(() => {});
          return;
          }
          await page.waitForTimeout(200).catch(() => {});
        }
      }
      catch {
        // Swallow any late errors when closing
      }
  })();

  (async () => {
      try {
        while (true) {
          if (page.isClosed()) return;
          const visibleDiscountCloseButton = await discountCloseButton.isVisible().catch(() => false);
          if (visibleDiscountCloseButton) {
            //discountPopupCount++;
            await discountCloseButton.click().catch(() => {});
            console.log("Discount closed");
            //await rejectCookiesButton.evaluate((el: HTMLElement) => el.click()).catch(() => {});
            //return; DO NOT RETURN HERE. There are some other popups that turn up with the same aria label
          }
          await page.waitForTimeout(200).catch(() => {});
        }
      }
      catch {
        // Swallow any late errors when closing
      }
  })();

    await use(page);

    await context.close();
    await browser.close();
  },
  // Page objects — use the custom page, keep constructor unchanged!
  homePage: async ({ page }, use) => {
    await use(new SaksHomePage(page));  // ← Exactly what you wanted!
  },

  designerList: async ({ page }, use) => {
    await use(new SaksDesignerBrandListPage(page));
  },

  pdp: async ({ page }, use) => {
    await use(new SaksProductDisplayPage(page));
  },

  filters: async ({ page }, use) => {
    await use(new SaksProductFilterPage(page));
  },

});

export { test };
export const expect = test.expect;
