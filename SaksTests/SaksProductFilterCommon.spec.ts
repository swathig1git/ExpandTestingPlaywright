// tests/pdp-verification.spec.ts
import { test, expect } from '../base/fixtureSaks.spec'; // your custom fixtures
import {verifyButtons} from '../SaksUtils/verifyUtils'
import { PRODUCT_TYPES, ProductType } from '../SaksUtils/productTypes';
// One test, runs once per product type
test.describe('Product Filter Verification - All Product Types', () => {
  for (const product of PRODUCT_TYPES) {
    test(`${product.name} → Browse By Filters Existence Verification`, async ({ page, homePage, pdp, filters,popUpOver,  cookiePopupClosed }) => {
      console.log(`Testing: ${product.name}`);

      // Step 1: Start from the correct category
      await page.goto(product.categoryUrl);
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });
      await filters.browseByButtons.nth(0).waitFor({ state: 'visible', timeout: 25000 });

      verifyButtons(filters.browseByButtons, product.browseByList, "Browse By");
      
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

      await filters.filterButtons.nth(0).scrollIntoViewIfNeeded();
      verifyButtons(filters.filterButtons, product.filterList, "Filters");

      
    });
  }
});