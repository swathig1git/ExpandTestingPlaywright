// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksProductFilterPage } from '../SaksPageObjects/SaksProductFilterPage';
import { SaksProductDisplayPage } from '../SaksPageObjects/SaksProductDisplayPage';
import { test } from '../base/fixtureSaks.spec';
import {isGreenShade} from '../SaksUtils/colorUtils'

test.describe('Saks Product Display @regression', () => {
test('Womens: Product Display: Size, Increment-Decrement Button Verification', async ({ page, cookiePopupClosed, filters, pdp }) => {
  test.setTimeout(120000); // 120 seconds
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await filters.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);

  //increment - decrement button verification
  await expect(pdp.decrementButton).toBeDisabled();
  await expect(pdp.incrementButton).toBeEnabled();
  await pdp.incrementButton.click();
  await expect(pdp.decrementButton).toBeEnabled();

  // Select a size message virification
  await pdp.selectASize.scrollIntoViewIfNeeded();
  await pdp.selectASize.waitFor();
  await pdp.selectASize.click();
  await expect(pdp.plsSelectSizeMsg).toBeVisible();

  //verifying previous and next image buttons
  await expect(pdp.previousImageButton).toHaveClass(/slick-disabled/);
  expect(pdp.nextImageButton).not.toHaveClass(/slick-disabled/);
  await pdp.nextImageButton.click();
  await expect(pdp.previousImageButton).not.toHaveClass(/slick-disabled/);
  await pdp.previousImageButton.click(); // got back to first image3q

});
})

test.describe('Saks Home Page @regression', () => {
test('Womens: Product Display: Image verification', async ({ page, filters, pdp }) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await filters.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);

  const count = await pdp.buttons.count();

  //verify that for first 6 images, the next button is enabled, but for last image it is disabled  
   const numberOfImages = 7;
   let previousImage = await pdp.buttonImages.nth(0).getAttribute("src");

 for (let i = 0; i < numberOfImages-1; i++) {
    await pdp.nextImageButton.click();
    await expect.poll(async () => {
        return await pdp.buttons.nth(i+1).getAttribute("class");
        }).toMatch(/ControlTrack__active/);

    if (i<numberOfImages-2){
      await expect(pdp.nextImageButton).not.toHaveClass(/slick-disabled/);
    }
    else{
      await expect(pdp.nextImageButton).toHaveClass(/slick-disabled/);
    }

    await pdp.buttons.nth(i+1).scrollIntoViewIfNeeded();
    let currentImage = await pdp.buttonImages.nth(i+1).getAttribute("src");

    expect (currentImage).not.toBe(previousImage);

    previousImage = currentImage;

   }


})
})

test.describe('Saks Product Display Page @regression', () => {
test('Womens: Product Display Different Size Verification', async ({ page , filters, pdp}) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");

  const numberOfProductsToTest = 5;

  let urlBefore = page.url();

  for (let i = 0; i < numberOfProductsToTest; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
    await filters.productCards.nth(i).scrollIntoViewIfNeeded();
    await filters.productCards.nth(i).waitFor();
    await filters.productCards.nth(i).click();
    await Promise.all([
    //page.waitForEvent('load'),                  // waits for full page load
    await page.waitForURL(url => url.toString() !== urlBefore, { timeout: 15000 })
    ])
    await pdp.clickFirstSizeButton();
    await pdp.addToBag.scrollIntoViewIfNeeded();
    await expect(pdp.addToBag).toBeVisible();
    await pdp.addToBag.click();

    await Promise.race([
      pdp.miniCart.waitFor({ state: "visible", timeout: 10000 }),
      pdp.stockQtyExceeded.waitFor({ state: "visible", timeout: 10000 })
    ]);
    
    const miniCartVisible = await pdp.miniCart.isVisible();
    const stockMsgVisible = await pdp.stockQtyExceeded.isVisible();

    expect(miniCartVisible || stockMsgVisible).toBeTruthy();

    await page.goBack();
    await page.waitForSelector("[data-testid*='product-card']", { timeout: 8000 });

  }

});
})

