// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksProductFilterPage } from '../SaksPageObjects/SaksProductFilterPage';
import { SaksProductDisplayPage } from '../SaksPageObjects/SaksProductDisplayPage';
import { test } from '../base/fixtureSaks.spec';
import {isGreenShade} from '../SaksUtils/colorUtils'

test('Womens: Product Colour Filter Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.clothingDropdown.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  await saksProductFilterPage.colourFilter.click();
  await saksProductFilterPage.greenColourFilter.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/clothing?color=green");

  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await saksProductFilterPage.onlyAtSaks.scrollIntoViewIfNeeded();
  await saksProductFilterPage.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });


  // Now safe to count
  const count = await saksProductFilterPage.productCards.count();
  console.log(`Found ${count} green products`);
  expect(count).toBeGreaterThan(0);

  let previousCount = 0;
  while (true) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(800);

    const count = await saksProductFilterPage.productCards.count();

    if (count === previousCount) break;
    previousCount = count;
  }

  console.log("previousCount = " + previousCount);

  for (const product of await saksProductFilterPage.productCards.all()) {
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

  await page.pause();
});

test.only('Womens: Product Designer Filter Verification', async ({ page }) => {
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  await saksProductFilterPage.designerFilter.click();
  let brandNameFromDesignerFilter = await saksProductFilterPage.designerOptions.nth(0).textContent();
  await saksProductFilterPage.designerOptions.nth(0).click();
  await expect(page).toHaveURL(/brand/);
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await saksProductFilterPage.onlyAtSaks.scrollIntoViewIfNeeded();
  await saksProductFilterPage.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  for (let i=0; i<10; i++){

    if((i+1) % 4 == 0)
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await saksProductFilterPage.productCards.nth(i).scrollIntoViewIfNeeded();
    await saksProductFilterPage.productCards.nth(i).waitFor({ state: 'visible', timeout: 25000 });
    let brandNameOfProduct = await saksProductFilterPage.brandName.nth(i).textContent();
    console.log("brandNameFromDesignerFilter= ", brandNameFromDesignerFilter, " brandNameOfProduct: ", brandNameOfProduct);
    expect(brandNameFromDesignerFilter).toBe(brandNameOfProduct);
  }
})



test('Womens: Product Designer Drop down Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.clothingDropdown.click();
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  await saksProductFilterPage.designerFilter.click();
  await saksProductFilterPage.designerOptions.nth(0).waitFor({ state: 'visible', timeout: 25000 });

  let count = await saksProductFilterPage.designerOptions.count();
  console.log(`Found ${count} designer options`);
  expect(count).toBe(10);

  await saksProductFilterPage.designerViewAll.click();
  count = await saksProductFilterPage.getAllDesignerBrandsCount();


  let designerButtonCount = await saksProductFilterPage.allDesignerOptions.count();

    expect (count).toBe(designerButtonCount);

  await page.pause();

});

test('Womens: Product Size Filter Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.clothingDropdown.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  await saksProductFilterPage.sizeFilter.click();
  await saksProductFilterPage.sizeXXSmall.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/clothing?size=f-vanity-refined-xx-small-00");

  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await saksProductFilterPage.onlyAtSaks.scrollIntoViewIfNeeded();
  await saksProductFilterPage.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });

  const saksProductDisplayPage = new SaksProductDisplayPage (page);

  const numberOfProductsToTest = 5;

  let urlBefore = "https://ca.saks.com/en-ca/women/clothing?size=f-vanity-refined-xx-small-00";

  for (let i = 0; i < numberOfProductsToTest; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
    await saksProductFilterPage.productCards.nth(i).scrollIntoViewIfNeeded();
    await saksProductFilterPage.productCards.nth(i).waitFor();
    await saksProductFilterPage.productCards.nth(i).click();
    await Promise.all([
    //page.waitForEvent('load'),                  // waits for full page load
    await page.waitForURL(url => url.toString() !== urlBefore, { timeout: 15000 })
    ])

    const hasXXS = await saksProductDisplayPage.isXXSSizeAvailable();
    console.log(`Product #${i + 1}: XXS size available? ${hasXXS}`);
    expect(hasXXS).toBeTruthy();
    console.log(`Product #${i + 1}: XXS size available? ${hasXXS}`);
    await page.goBack();
    await page.waitForSelector("[data-testid*='product-card']", { timeout: 8000 });

  }

  
});


