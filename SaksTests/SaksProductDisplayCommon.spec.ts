// tests/pdp-verification.spec.ts
import { test, expect } from '../base/fixtureSaks.spec'; // your custom fixtures
import { PRODUCT_TYPES, ProductType } from '../SaksUtils/productTypes';
// One test, runs once per product type
test.describe('PDP Verification - All Product Types', () => {
  for (const product of PRODUCT_TYPES) {
    test(`${product.name} → PDP works correctly`, async ({ page, homePage, pdp, filters,popUpOver,  cookiePopupClosed }) => {
      console.log(`Testing: ${product.name}`);

      // Step 1: Start from the correct category
      await page.goto(product.categoryUrl);

      // Optional: use search if category is too slow/flaky
      // await homePage.searchFor(product.searchTerm);

      // Step 2: Click first available product card
      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

      let brandName = await filters.brandName.nth(0).textContent();
      let productName = await filters.productName.nth(0).textContent();
      let originalPrice = await filters.originalPrice.nth(0).textContent();

      await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
      await filters.productCards.nth(0).click();
      await expect(page).toHaveURL(/product/);

      // Step 3: Common checks for all proucts
      await expect(pdp.productName).toBeVisible();
      await expect(pdp.originalPrice).toBeVisible();
      //await expect(pdp.dutiesIncluded).toBeVisible();
      await expect(pdp.colorOptions).toBeVisible();
      await expect(pdp.inputQuantity).toBeVisible();
      await expect(pdp.decrementButton).toBeVisible();
      await expect(pdp.incrementButton).toBeVisible();

      let pdpProductName = await pdp.productName.textContent();
      let pdpOriginalPrice = await pdp.originalPrice.textContent();

      //We are not comparing brand here, because items in Home page dont have brand
      expect (pdpProductName).toBe(productName);
      expect (pdpOriginalPrice).toBe(originalPrice);

      await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });
      await pdp.addToFavoritesHeart.scrollIntoViewIfNeeded();
      await expect(pdp.addToFavoritesHeart).toBeVisible();
      await pdp.favoritesContainer.scrollIntoViewIfNeeded();
      await expect(pdp.favoritesContainer).toBeVisible();

      let pdpBrandName;
      // Specific checks based on type of products
      switch(product.name){
        case "Men Accessories":
            await expect (pdp.addToBag).toBeVisible();
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;
        case "Men Clothing":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.selectASize).toBeVisible();            
            break;
        case "Men Gifts":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;
        case "Men Grooming":
            await expect (pdp.addToBag).toBeVisible();  
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;          
        case "Men Sale":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;
        case "Men Shoes":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.selectASize).toBeVisible();  
            break;
        case "Women Accessories":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.addToBag).toBeVisible();
            break;
        case "Women Beauty":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.addToBag).toBeVisible();
            break;
        case "Women Clothing":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.selectASize).toBeVisible();  
            break;
        case "Women Dresses":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.selectASize).toBeVisible();  
            break;
        case "Women Gifts":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;
        case "Women Handbags":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.addToBag).toBeVisible();
            break;
        case "Women Home":
            await expect (pdp.addToBag).toBeVisible();
            break;
        case "Women Jewellery":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.addToBag).toBeVisible();
            break;
        case "Women Kids":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;
        case "Women Sale":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            break;
        case "Women Shoes":
            pdpBrandName = await pdp.brandName.textContent();
            expect (pdpBrandName).toBe(brandName);
            await expect (pdp.selectASize).toBeVisible();  
            break;
      }
    });
  }
});