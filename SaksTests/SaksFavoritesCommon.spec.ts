// tests/pdp-verification.spec.ts
import { test, expect } from '../base/fixtureSaks.spec'; // your custom fixtures
import { PRODUCT_TYPES, ProductType } from '../SaksUtils/productTypes';
// One test, runs once per product type
test.describe('Favorites Verification - All Product Types', () => {
  for (const product of PRODUCT_TYPES) {
    test(`${product.name} → Empty Favorites Testing`, async ({ page, pdp, filters,favorites,  cookiePopupClosed }) => {
      console.log(`Testing: ${product.name}`);

      // Step 1: Start from the correct category
      await page.goto(product.categoryUrl);

      // Step 2: Click first available product card
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

      await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
      await filters.productCards.nth(0).click();
      await expect(pdp.favoritesContainer).toBeVisible();
      await pdp.favoritesContainer.click();
      //console.log(page.url());
      expect(page.url()).toContain("my-favorites");
      await expect (favorites.favoritesDescription).toBeVisible();


    });
  }
});

test.describe('Favorites Verification - All Product Types', () => {
  for (const product of PRODUCT_TYPES) {
    test(`${product.name} → One Favorite Testing`, async ({ page, pdp, filters,favorites,  cookiePopupClosed }) => {
      console.log(`Testing: ${product.name}`);

      // Step 1: Start from the correct category
      await page.goto(product.categoryUrl);

      // Step 2: Click first available product card
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

      await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
      await filters.productCards.nth(0).click();
      await pdp.addToFavoritesHeart.scrollIntoViewIfNeeded();
      await pdp.addToFavoritesHeart.click();
      await expect(pdp.favoritesContainer).toBeVisible();
    
      let brandName;
      if (!product.name.includes("Home")){
        brandName = await pdp.brandName.textContent();
      }

      let productName = await pdp.productName.textContent();
      await pdp.favoritesContainer.click();
      //console.log(page.url());
      expect(page.url()).toContain("my-favorites");

      let favProductName = await favorites.productName.textContent();
      expect (favProductName).toBe(productName);

      if (!product.name.includes("Home")){
        let favBrandName = await favorites.brandName.textContent();
        expect (favBrandName).toBe(brandName);
      }


    });
  }
});

test.describe('Favorites Verification - All Product Types', () => {
  for (const product of PRODUCT_TYPES) {
    test.only(`${product.name} → Two Favorite Testing`, async ({ page, pdp, filters,favorites,  cookiePopupClosed }) => {
      console.log(`Testing: ${product.name}`);

      // Step 1: Start from the correct category
      await page.goto(product.categoryUrl);

      // Step 2: Click first available product card
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

      await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
      await filters.productCards.nth(0).click();
      //first product added to favorites
      await pdp.addToFavoritesHeart.scrollIntoViewIfNeeded();
      await pdp.addToFavoritesHeart.click();

      await pdp.youMayAlsoLike.scrollIntoViewIfNeeded();
      await pdp.youMayAlsoLikeProducts.nth(0).click();

      //second product product added to favorites
      await pdp.addToFavoritesHeart.scrollIntoViewIfNeeded();
      await pdp.addToFavoritesHeart.click();

      //go to favorites page
      await pdp.favoritesContainer.click();
      await favorites.productName.nth(0).waitFor({ state: 'visible', timeout: 25000 });
      let count = await favorites.productName.count();

      expect (count).toBe(2);

      


    });
  }
});