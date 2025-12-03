// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksProductFilterPage } from '../SaksPageObjects/SaksProductFilterPage';
import { SaksProductDisplayPage } from '../SaksPageObjects/SaksProductDisplayPage';
import { test } from '../base/fixtureSaks.spec';
import {isGreenShade} from '../SaksUtils/colorUtils'

test.describe('Saks Product Display @regression', () => {
test('Womens: Product Display: Size, Increment-Decrement Button Verification', async ({ page, cookiePopupClosed }) => {
  test.setTimeout(120000); // 120 seconds
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await saksProductFilterPage.onlyAtSaks.scrollIntoViewIfNeeded();
  await saksProductFilterPage.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await saksProductFilterPage.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);


  const saksProductDisplayPage = new SaksProductDisplayPage(page);

  //increment - decrement button verification
  await expect(saksProductDisplayPage.decrementButton).toBeDisabled();
  await expect(saksProductDisplayPage.incrementButton).toBeEnabled();
  await saksProductDisplayPage.incrementButton.click();
  await expect(saksProductDisplayPage.decrementButton).toBeEnabled();

  // Select a size message virification
  await saksProductDisplayPage.selectASize.scrollIntoViewIfNeeded();
  await saksProductDisplayPage.selectASize.waitFor();
  await saksProductDisplayPage.selectASize.click();
  await expect(saksProductDisplayPage.plsSelectSizeMsg).toBeVisible();

  //verifying previous and next image buttons
  await expect(saksProductDisplayPage.previousImageButton).toHaveClass(/slick-disabled/);
  expect(saksProductDisplayPage.nextImageButton).not.toHaveClass(/slick-disabled/);
  await saksProductDisplayPage.nextImageButton.click();
  await expect(saksProductDisplayPage.previousImageButton).not.toHaveClass(/slick-disabled/);
  await saksProductDisplayPage.previousImageButton.click(); // got back to first image3q

});
})

test.describe('Saks Home Page @regression', () => {
test('Womens: Product Display: Image verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await saksProductFilterPage.onlyAtSaks.scrollIntoViewIfNeeded();
  await saksProductFilterPage.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await saksProductFilterPage.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);


  const saksProductDisplayPage = new SaksProductDisplayPage(page);

  const count = await saksProductDisplayPage.buttons.count();

  //verify that for first 6 images, the next button is enabled, but for last image it is disabled  
   const numberOfImages = 7;
   let previousImage = await saksProductDisplayPage.buttonImages.nth(0).getAttribute("src");

 for (let i = 0; i < numberOfImages-1; i++) {
    await saksProductDisplayPage.nextImageButton.click();
    await expect.poll(async () => {
        return await saksProductDisplayPage.buttons.nth(i+1).getAttribute("class");
        }).toMatch(/ControlTrack__active/);

    if (i<numberOfImages-2){
      await expect(saksProductDisplayPage.nextImageButton).not.toHaveClass(/slick-disabled/);
    }
    else{
      await expect(saksProductDisplayPage.nextImageButton).toHaveClass(/slick-disabled/);
    }

    await saksProductDisplayPage.buttons.nth(i+1).scrollIntoViewIfNeeded();
    let currentImage = await saksProductDisplayPage.buttonImages.nth(i+1).getAttribute("src");

    expect (currentImage).not.toBe(previousImage);

    previousImage = currentImage;

   }


})
})

test.describe('Saks Product Display Page @regression', () => {
test('Womens: Product Display Different Size Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  const saksProductFilterPage = new SaksProductFilterPage(page);
  const saksProductDisplayPage = new SaksProductDisplayPage(page);

  const numberOfProductsToTest = 5;

  let urlBefore = page.url();

  for (let i = 0; i < numberOfProductsToTest; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
    await saksProductFilterPage.productCards.nth(i).scrollIntoViewIfNeeded();
    await saksProductFilterPage.productCards.nth(i).waitFor();
    await saksProductFilterPage.productCards.nth(i).click();
    await Promise.all([
    //page.waitForEvent('load'),                  // waits for full page load
    await page.waitForURL(url => url.toString() !== urlBefore, { timeout: 15000 })
    ])
    await saksProductDisplayPage.clickFirstSizeButton();
    await saksProductDisplayPage.addToBag.scrollIntoViewIfNeeded();
    await expect(saksProductDisplayPage.addToBag).toBeVisible();
    await saksProductDisplayPage.addToBag.click();

    await Promise.race([
      saksProductDisplayPage.miniCart.waitFor({ state: "visible", timeout: 10000 }),
      saksProductDisplayPage.stockQtyExceeded.waitFor({ state: "visible", timeout: 10000 })
    ]);
    
    const miniCartVisible = await saksProductDisplayPage.miniCart.isVisible();
    const stockMsgVisible = await saksProductDisplayPage.stockQtyExceeded.isVisible();

    expect(miniCartVisible || stockMsgVisible).toBeTruthy();

    await page.goBack();
    await page.waitForSelector("[data-testid*='product-card']", { timeout: 8000 });

  }

});
})

