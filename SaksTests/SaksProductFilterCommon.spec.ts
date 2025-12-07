// tests/pdp-verification.spec.ts
import { test, expect } from '../base/fixtureSaks.spec'; // your custom fixtures
import {verifyButtons} from '../SaksUtils/verifyUtils'
import { PRODUCT_TYPES, ProductType } from '../SaksUtils/productTypes';
import { toUrlName, priceInNumber } from "../SaksUtils/stringUtils";

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
    test(`${productType.name} → Browse By   `, async ({ page, homePage, pdp, filters,popUpOver,  cookiePopupClosed }, testInfo) => {
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

test.describe('Product Filter Verification - Pricing - All Products', () => {
  for (const productType of PRODUCT_TYPES) {
    test(`${productType.name} → Price Range Verification   `, async ({ page, filters,cookiePopupClosed }, testInfo) => {
      test.setTimeout(60000); 
      console.log(`Testing: ${productType.name}`);

      // Step 1: Start from the correct category
      await page.goto(productType.categoryUrl);
      await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
      let minPrice = "500";
      let maxPrice = "6000"
      await filters.filtersHeader.scrollIntoViewIfNeeded();
      await filters.priceButton.scrollIntoViewIfNeeded();
      await filters.priceButton.click();
      await filters.priceMin.scrollIntoViewIfNeeded();
      await filters.priceMin.fill(minPrice);
      await filters.priceMax.fill(maxPrice);
      await filters.updatePrice.scrollIntoViewIfNeeded();
      await filters.updatePrice.click();

      //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
      await filters.browseBy.scrollIntoViewIfNeeded();
      await filters.productCurrentPrice.nth(0).waitFor({ state: 'visible', timeout: 25000 });

      const numberOfProductsToVerify = 8;

      // Now safe to count
      const count = await filters.productCurrentPrice.count();
      console.log(`Found ${count} products`);
      expect(count).toBeGreaterThan(0);

      let previousCount = 0;
      while (true) {
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(800);

        const count = await filters.productCurrentPrice.count();

        if (count === previousCount || count > numberOfProductsToVerify) break;
        previousCount = count;
      }


      const priceLocators = await filters.productCurrentPrice.all();

      for (const [index, priceLocator] of priceLocators.slice(0, numberOfProductsToVerify).entries()) {
          const html = await priceLocator.innerHTML();
          console.log(html);

          const productPrice = await priceLocator.textContent();
          console.log("Price = ", productPrice);
          let productPriceInNumber;
          if (productPrice !== null) {
              productPriceInNumber = priceInNumber(productPrice);
          }
          expect(productPriceInNumber).toBeGreaterThanOrEqual(Number(minPrice));
          expect(productPriceInNumber).toBeLessThanOrEqual(Number(maxPrice));
      }
      
    });
  }
});


test.describe('Product Filter Verification - Pricing - All Products', () => {
  for (const productType of PRODUCT_TYPES) {
    test(`${productType.name} → Price Out of Range Verification   `, async ({ page, filters,cookiePopupClosed }, testInfo) => {
      test.setTimeout(60000); 
      console.log(`Testing: ${productType.name}`);

      // Step 1: Start from the correct category
      await page.goto(productType.categoryUrl);
      await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
      let minPrice = "1000000";
      let maxPrice = "2000000"
      await filters.filtersHeader.scrollIntoViewIfNeeded();
      await filters.priceButton.scrollIntoViewIfNeeded();
      await filters.priceButton.click();
      await filters.priceMin.scrollIntoViewIfNeeded();
      await filters.priceMin.fill(minPrice);
      await filters.priceMax.fill(maxPrice);
      await filters.updatePrice.scrollIntoViewIfNeeded();
      await filters.updatePrice.click();

      await expect(filters.emptyList).toBeVisible();

      
    });
  }
});

test.describe('Product Filter Verification - Pricing - All Products', () => {
  for (const productType of PRODUCT_TYPES) {
    test.only(`${productType.name} → Price Wrong Range Verification   `, async ({ page, filters,cookiePopupClosed }, testInfo) => {
      test.setTimeout(60000); 
      console.log(`Testing: ${productType.name}`);

      // Step 1: Start from the correct category
      await page.goto(productType.categoryUrl);
      await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
      let minPrice = "2000";
      let maxPrice = "1000"
      await filters.filtersHeader.scrollIntoViewIfNeeded();
      await filters.priceButton.scrollIntoViewIfNeeded();
      await filters.priceButton.click();
      await filters.priceMin.scrollIntoViewIfNeeded();
      await filters.priceMin.fill(minPrice);
      await filters.priceMax.fill(maxPrice);
      await filters.updatePrice.scrollIntoViewIfNeeded();
      await filters.updatePrice.click();

      await expect(filters.priceRangeError).toBeVisible();

      
    });
  }
});



test.describe('Product Filter Verification - Colour - All Products', () => {
  for (const productType of PRODUCT_TYPES) {
    test(`${productType.name} → Colour Filter Verification   `, async ({ page, filters,cookiePopupClosed }, testInfo) => {
      test.setTimeout(60000); 
      console.log(`Testing: ${productType.name}`);

      // Step 1: Start from the correct category
      await page.goto(productType.categoryUrl);
      await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);

      await filters.colourFilter.scrollIntoViewIfNeeded();
      await filters.colourFilter.click();
      await filters.allColours.nth(0).waitFor({ state: 'visible', timeout: 25000 });

      let colourLocators = await filters.allColours.all();
      const selectedButtonsLocator = filters.selectedFilterButtons;
      for (const colourLocator of colourLocators) {
          let colour = await colourLocator.textContent();
          //console.log("colour = ", colour);

          await colourLocator.click();

          const ariaPressed = await colourLocator.getAttribute('aria-pressed');
          expect (ariaPressed).toBeTruthy();

          //console.log("new page URL: ", page.url());
          expect(page.url()).toContain(colour?.toLowerCase());
          const count = await selectedButtonsLocator.count();
          //Second last button, last button is always CLEAR ALL
          //When you select the first button, there is no CLEAR ALL Button, 
          // but still it works because nth(-1) returns the last button of the locator, which is the first or only button 
          const secondLastButton = selectedButtonsLocator.nth(count - 2);
          const colourSecondLastButton = await secondLastButton.textContent();
          expect (colour).toBe(colourSecondLastButton);
      }

       const count = await selectedButtonsLocator.count();
       const lastButton = selectedButtonsLocator.nth(count - 1);
       await lastButton.click();
       expect (page.url()). toBe(productType.categoryUrl);

       colourLocators = await filters.allColours.all();
       for (const colourLocator of colourLocators) {

          const ariaPressed = await colourLocator.getAttribute('aria-pressed');
          expect (ariaPressed).toBeFalsy();
      
       }

    })
  }
});
