// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksProductFilterPage } from '../SaksPageObjects/SaksProductFilterPage';
import { SaksProductDisplayPage } from '../SaksPageObjects/SaksProductDisplayPage';
import { test } from '../base/fixtureSaks.spec';
import {isGreenShade} from '../SaksUtils/colorUtils'

test.describe('Saks Home Page @regression', () => {
test('Womens: Product Colour Filter Verification', async ({ page, filters }) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  await filters.colourFilter.click();
  await filters.greenColourFilter.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/clothing?color=green");

  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });


  // Now safe to count
  const count = await filters.productCards.count();
  console.log(`Found ${count} green products`);
  expect(count).toBeGreaterThan(0);

  let previousCount = 0;
  while (true) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(800);

    const count = await filters.productCards.count();

    if (count === previousCount) break;
    previousCount = count;
  }

  console.log("previousCount = " + previousCount);

  for (const product of await filters.productCards.all()) {
  const href = await product.getAttribute("href");
  if (!href) continue;

  const colorPart = href.split("color=")[1];
  if (!colorPart) continue;

  const colors = colorPart.split("-").map(c => c.toLowerCase().trim());

  //console.log(colors);

  const hasGreenShade = colors.some(c => isGreenShade(c));

if (!hasGreenShade) {
  console.log("❌ Non-green product colors:", colors);
}

  //expect(hasGreenShade).toBeTruthy();  // at least one of the colors must be a green shade
}

});
})

test.describe('Saks Home Page @regression', () => {
test('Womens: Product Designer Filter Verification', async ({ page, filters }) => {
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  await filters.designerFilter.click();
  let brandNameFromDesignerFilter = await filters.designerOptions.nth(0).textContent();
  await filters.designerOptions.nth(0).click();
  await expect(page).toHaveURL(/brand/);
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  for (let i=0; i<10; i++){

    if((i+1) % 4 == 0)
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await filters.productCards.nth(i).scrollIntoViewIfNeeded();
    await filters.productCards.nth(i).waitFor({ state: 'visible', timeout: 25000 });
    let brandNameOfProduct = await filters.brandName.nth(i).textContent();
    console.log("brandNameFromDesignerFilter= ", brandNameFromDesignerFilter, " brandNameOfProduct: ", brandNameOfProduct);
    expect(brandNameFromDesignerFilter).toBe(brandNameOfProduct);
  }
})
})


test.describe('Saks Home Page @regression', () => {
test('Womens: Product Designer Drop down Verification', async ({ page, filters }) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  await filters.designerFilter.click();
  await filters.designerOptions.nth(0).waitFor({ state: 'visible', timeout: 25000 });

  let count = await filters.designerOptions.count();
  console.log(`Found ${count} designer options`);
  expect(count).toBe(10);

  await filters.designerViewAll.click();
  count = await filters.getAllDesignerBrandsCount();


  let designerButtonCount = await filters.allDesignerOptions.count();

    expect (count).toBe(designerButtonCount);

});
})

test.describe('Saks Product Filters @regression @debugging', () => {
test('Womens: Product Size Filter Verification', async ({ page, cookiePopupClosed, filters }) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);

  await filters.sizeFilter.click();
  await filters.sizeXXSmall.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/clothing?size=f-vanity-refined-xx-small-00");

  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });

  const saksProductDisplayPage = new SaksProductDisplayPage (page);

  const numberOfProductsToTest = 5;

  let urlBefore = "https://ca.saks.com/en-ca/women/clothing?size=f-vanity-refined-xx-small-00";

  for (let i = 0; i < numberOfProductsToTest; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
    await filters.productCards.nth(i).scrollIntoViewIfNeeded();
    await filters.productCards.nth(i).waitFor();
    await filters.productCards.nth(i).click();
    await Promise.all([
    //page.waitForEvent('load'),                  // waits for full page load
    await page.waitForURL(url => url.toString() !== urlBefore, { timeout: 15000 })
    ])

    const hasXXS = await saksProductDisplayPage.isXXSSizeAvailable();
    console.log(`Product #${i + 1}: XXS size available? ${hasXXS}`);
    expect(hasXXS).toBeTruthy();
    await page.goBack();
    await page.waitForSelector("[data-testid*='product-card']", { timeout: 8000 });

  }

  
});
})


