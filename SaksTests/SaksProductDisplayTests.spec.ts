// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksProductFilterPage } from '../SaksPageObjects/SaksProductFilterPage';
import { SaksProductDisplayPage } from '../SaksPageObjects/SaksProductDisplayPage';
import { test } from '../base/fixtureSaks.spec';
import {isGreenShade} from '../SaksUtils/colorUtils'

test('Product Display Size and Button Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.clothingDropdown.click();
  const saksProductFilterPage = new SaksProductFilterPage(page);
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await saksProductFilterPage.onlyAtSaks.scrollIntoViewIfNeeded();
  await saksProductFilterPage.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await saksProductFilterPage.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);


  const saksProductDisplayPage = new SaksProductDisplayPage(page);

  await expect(saksProductDisplayPage.decrementButton).toBeDisabled();
  await expect(saksProductDisplayPage.incrementButton).toBeEnabled();

  await saksProductDisplayPage.incrementButton.click();
  await expect(saksProductDisplayPage.decrementButton).toBeEnabled();


  await saksProductDisplayPage.selectASize.scrollIntoViewIfNeeded();
  await saksProductDisplayPage.selectASize.waitFor();
  await saksProductDisplayPage.selectASize.click();
  await expect(saksProductDisplayPage.plsSelectSizeMsg).toBeVisible();

});

test.only('Product Display Different Size Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.clothingDropdown.click();
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



