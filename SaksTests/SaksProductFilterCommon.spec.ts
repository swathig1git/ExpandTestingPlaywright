// tests/pdp-verification.spec.ts
import { test, expect } from '../base/fixtureSaks.spec'; // your custom fixtures
import {verifyButtons} from '../SaksUtils/verifyUtils'
import { PRODUCT_TYPES, ProductType } from '../SaksUtils/productTypes';
import { toUrlName } from "../SaksUtils/stringUtils";

// One test, runs once per product type
test.describe('Product Filter Verification - All Product Types', () => {
  for (const productType of PRODUCT_TYPES) {
    test(`${productType.name} → Browse By and Filters Existence Verification`, async ({ page, homePage, pdp, filters,popUpOver,  cookiePopupClosed }) => {
      console.log(`Testing: ${productType.name}`);

      // Step 1: Start from the correct category
      await page.goto(productType.categoryUrl);
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });
      await filters.browseByButtons.nth(0).waitFor({ state: 'visible', timeout: 25000 });

      await verifyButtons(filters.browseByButtons, productType.browseByList, "Browse By");
      
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

      await filters.filterButtons.nth(0).scrollIntoViewIfNeeded();
      await verifyButtons(filters.filterButtons, productType.filterList, "Filters");

      if (productType.bannerCategories && productType.bannerCategories.length > 0) {
          await verifyButtons(filters.topBannerCategories, productType.bannerCategories, "Banner Categories");
      }
      
    });
  }
});

test.describe('Product Filter Verification - Page change Verification - All Products', () => {
  for (const productType of PRODUCT_TYPES) {
    test.only(`${productType.name} → Browse By   `, async ({ page, homePage, pdp, filters,popUpOver,  cookiePopupClosed }, testInfo) => {
      test.setTimeout(250000); 
      console.log(`Testing: ${productType.name}`);

      // Step 1: Start from the correct category
      await page.goto(productType.categoryUrl);
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });
      await filters.browseByButtons.nth(0).waitFor({ state: 'visible', timeout: 25000 });

      const buttonCount = await filters.browseByButtons.count();

      for (let i=0; i<buttonCount; i++) {
          const buttonName = (await filters.browseByButtons.nth(i).textContent())?.trim() || "";
          const urlName = toUrlName(buttonName);
          await filters.browseByButtons.nth(i).scrollIntoViewIfNeeded();
          await filters.browseByButtons.nth(i).click({ timeout: 10000 });

          console.log("new page URL: ", page.url());
          expect(page.url()).toContain(productType.urlForBrowseByList[i]);
          // Verify URL
          //expect(page.url().toLowerCase()).toContain(urlName);
          const currentPath = new URL(page.url()).pathname;
          const basePath = new URL(productType.categoryUrl).pathname;
          if (currentPath !== basePath) {
            // Path changed → go back
            await page.goBack();
          } else {
              // Only query changed → stay on page
              console.log("No need to go back, only query params changed");
            }
      }
      
    });
  }
});

