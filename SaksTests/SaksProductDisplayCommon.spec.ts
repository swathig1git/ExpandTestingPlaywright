// tests/pdp-verification.spec.ts
import { test, expect } from '../base/fixtureSaks.spec'; // your custom fixtures

// This is the magic — one object per product type
const PRODUCT_TYPES = [
  {
    name: 'Women Clothing',
    startFrom: 'Women > Designers',
    categoryUrl: 'https://ca.saks.com/en-ca/women/clothing',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
  },
{
    name: 'Men Clothing',
    startFrom: 'Men > Clothing',
    categoryUrl: 'https://ca.saks.com/en-ca/men/clothing',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Dresses',
    startFrom: 'Women > Dresses',
    categoryUrl: 'https://ca.saks.com/en-ca/women/clothing/dresses',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Shoes',
    startFrom: 'Women > Shoes',
    categoryUrl: 'https://ca.saks.com/en-ca/women/shoes',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Men Shoes',
    startFrom: 'Men > Shoes',
    categoryUrl: 'https://ca.saks.com/en-ca/men/shoes',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Handbags',
    startFrom: 'Women > Handbags',
    categoryUrl: 'https://ca.saks.com/en-ca/women/handbags',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Jewellery',
    startFrom: 'Women > Jewellery',
    categoryUrl: 'https://ca.saks.com/en-ca/women/jewelry',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Accessories',
    startFrom: 'Women > Accessories',
    categoryUrl: 'https://ca.saks.com/en-ca/women/accessories',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Men Accessories',
    startFrom: 'Men > Accessories',
    categoryUrl: 'https://ca.saks.com/en-ca/men/accessories',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Beauty',
    startFrom: 'Women > Beauty',
    categoryUrl: 'https://ca.saks.com/en-ca/women/beauty',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Men Grooming',
    startFrom: 'Men > Grooming',
    categoryUrl: 'https://ca.saks.com/en-ca/men/grooming',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Kids',
    startFrom: 'Women > Kids',
    categoryUrl: 'https://ca.saks.com/en-ca/women/kids',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Home',
    startFrom: 'Women > Home',
    categoryUrl: 'https://ca.saks.com/en-ca/women/home',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Gifts',
    startFrom: 'Women > Gifts',
    categoryUrl: 'https://ca.saks.com/en-ca/women/gifting',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Men Gifts',
    startFrom: 'Men > Gifts',
    categoryUrl: 'https://ca.saks.com/en-ca/men/gifting',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Women Sale',
    startFrom: 'Women > Sale',
    categoryUrl: 'https://ca.saks.com/en-ca/women/sale',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},
{
    name: 'Men Sale',
    startFrom: 'Men > Sale',
    categoryUrl: 'https://ca.saks.com/en-ca/men/sale',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
},

//   {
//     name: 'Men Shoes',
//     startFrom: 'Men > Shoes',
//     categoryUrl: 'https://ca.saksfifthavenue.com/c/men/shoes',
//     searchTerm: 'Common Projects Achilles',
//     expectedSizeType: 'us-shoe', // e.g., 8, 9, 10
//   },
//   {
//     name: 'Kids Clothing',
//     startFrom: 'Kids > Girls > Clothing',
//     categoryUrl: 'https://ca.saksfifthavenue.com/c/kids/girls/clothing',
//     searchTerm: 'Burberry dress',
//     expectedSizeType: 'age', // e.g., 4Y, 6Y
//   },
//   {
//     name: 'Jewelry',
//     startFrom: 'Jewelry & Accessories > Fine Jewelry',
//     categoryUrl: 'https://ca.saksfifthavenue.com/c/jewelry-accessories/fine-jewelry',
//     searchTerm: 'Tiffany T1 ring',
//     expectedSizeType: 'ring', // e.g., 5, 6, 7
//   },
//   {
//     name: 'Beauty',
//     startFrom: 'Beauty',
//     categoryUrl: 'https://ca.saksfifthavenue.com/c/beauty',
//     searchTerm: 'La Mer Creme',
//     expectedSizeType: 'none', // no size selector
//   },
] as const;

// One test, runs once per product type
test.describe('PDP Verification - All Product Types', () => {
  for (const product of PRODUCT_TYPES) {
    test(`${product.name} → PDP works correctly`, async ({ page, homePage, pdp, filters,popUpOver,  cookiePopupClosed }) => {
      console.log(`Testing: ${product.name}`);
        //await expect.poll(() => popUpOver.value, { timeout: 30_000 }).toBe(true);
        //await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);

      // Step 1: Start from the correct category
      await page.goto(product.categoryUrl);

      // Optional: use search if category is too slow/flaky
      // await homePage.searchFor(product.searchTerm);

      // Step 2: Click first available product card
        //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
        //await filters.onlyAtSaks.scrollIntoViewIfNeeded();
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight * 0.5); // scrolls to 50% of page height
            });

        await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
        await filters.productCards.nth(0).click();
        await expect(page).toHaveURL(/product/);

    //   // Step 3: Wait for PDP to load
    await pdp.productName.scrollIntoViewIfNeeded();
    await expect(pdp.productName).toBeVisible();
    await pdp.originalPrice.scrollIntoViewIfNeeded();
    await expect(pdp.originalPrice).toBeVisible();
    //await expect(pdp.dutiesIncluded).toBeVisible();
    await pdp.colorOptions.scrollIntoViewIfNeeded();
    await expect(pdp.colorOptions).toBeVisible();
    await pdp.inputQuantity.scrollIntoViewIfNeeded();
    await expect(pdp.inputQuantity).toBeVisible();
    await pdp.decrementButton.scrollIntoViewIfNeeded();
    await expect(pdp.decrementButton).toBeVisible();
    await pdp.incrementButton.scrollIntoViewIfNeeded();
    await expect(pdp.incrementButton).toBeVisible();
    // await pdp.addToBag.scrollIntoViewIfNeeded();
    // await expect(pdp.addToBag).toBeVisible();
    await pdp.addToFavoritesHeart.scrollIntoViewIfNeeded();
    await expect(pdp.addToFavoritesHeart).toBeVisible();
    await pdp.favoritesContainer.scrollIntoViewIfNeeded();
    await expect(pdp.favoritesContainer).toBeVisible();

    //   // Step 4: Run common PDP checks
    //   await expect(pdp.productImages).toBeVisible();
    //   await expect(pdp.price).toBeVisible();
    //   await expect(pdp.addToBagButton).toBeEnabled();

    //   // Step 5: Product-type-specific checks
    //   switch (product.expectedSizeType) {
    //     case 'numeric':
    //     case 'us-shoe':
    //     case 'ring':
    //       await expect(pdp.sizeButtons.first()).toBeVisible();
    //       break;
    //     case 'age':
    //       await expect(page.getByText(/Y$/)).toBeVisible(); // e.g., 4Y, 6Y
    //       break;
    //     case 'none':
    //       await expect(pdp.sizeButtons).toHaveCount(0);
    //       break;
    //   }

    //   // Step 6: Add to bag works
    //   if (product.expectedSizeType !== 'none') {
    //     await pdp.selectFirstAvailableSize();
    //   }
    //   await pdp.clickAddToBag();
    //   await expect(pdp.addToBagConfirmation).toBeVisible({ timeout: 10000 });
    });
  }
});