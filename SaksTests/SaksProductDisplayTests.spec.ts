// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { test } from '../base/fixtureSaks.spec';

test.describe('Saks Product Display @regression', () => {
test('Womens: Clothing Product Display: Size, Increment-Decrement Button Verification', async ({ page, cookiePopupClosed, filters, pdp }) => {
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

  //verify the Women on the top left corner
  expect(await pdp.menOrWomen.textContent()).toBe("Women");

});
})

test.describe('Saks Product Display @regression', () => {
test('Womens:Clothing Product Display: Atleast one size Button Verification', async ({ page, cookiePopupClosed, filters, pdp }) => {
  test.setTimeout(120000); // 120 seconds
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await filters.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);

  const count = await pdp.sizeButtons.count();
  expect(count).toBeGreaterThan(0); // At least 1 button exists
  await expect(pdp.sizeButtons.first()).toBeVisible();  

});
})

test.describe('Saks Product Display @regression', () => {
test('Womens: Clothing Product Display: Size guide Verification', async ({ page, cookiePopupClosed, filters, pdp }) => {
  test.setTimeout(120000); // 120 seconds
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await filters.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);

  await pdp.sizeGuide.click();
  await pdp.sizeGuideTable.waitFor({ state: 'visible', timeout: 25000 });
  let menOrWomen = await pdp.menOrWomen.textContent();
  expect (await pdp.sizeGuideCategory.textContent()).toContain(menOrWomen);
  await pdp.sizeGuideClose.click();
  await expect(pdp.sizeGuideTable).toBeHidden({ timeout: 10000 });
  


});
})

test.describe('Saks Product Display @regression', () => {
test.only('Womens: Clothing Add to Favorites Verification', async ({ page, cookiePopupClosed, filters, pdp, favorites }) => {
  test.setTimeout(120000); // 120 seconds
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);
  await page.goto("https://ca.saks.com/en-ca/women/clothing");
  //We are scrolling here only to make sure that products are visibile. This has nothing to with the test
  await filters.onlyAtSaks.scrollIntoViewIfNeeded();
  await filters.productCards.nth(0).waitFor({ state: 'visible', timeout: 25000 });
  await filters.productCards.nth(0).click();
  await expect(page).toHaveURL(/product/);

  await pdp.addToFavoritesHeart.click();
  await expect(pdp.addToFavoritesHeart).toHaveAttribute('aria-pressed', 'true');
  await expect(pdp.favoritesContainer).not.toHaveClass(/FavoritesLink__empty/);
  let brandName = await pdp.brandName.textContent();
  let productName = await pdp.productName.textContent();

  await pdp.favoritesContainer.click();
  await expect(page).toHaveURL(/my-favorites/)

  let favBrandName = await favorites.brandName.textContent();
  let favProductName = await favorites.productName.textContent();

  expect (favBrandName).toBe(brandName);
  expect (favProductName).toBe(productName);
  

});
})



test.describe('Saks Product Display Page @regression', () => {
test('Womens: Clothing Product Display: Image verification', async ({ page, filters, pdp }) => {
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

// test.describe('Saks Product Display Page @regression', () => {
// test('Womens: Product Display Different Size Verification', async ({ page , filters, pdp}) => {
//   test.setTimeout(120000); // 120 seconds
//   await page.goto("https://ca.saks.com/en-ca/women/clothing");


//   let urlBefore = page.url();
//     await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
//     await filters.productCards.nth(0).scrollIntoViewIfNeeded();
//     await filters.productCards.nth(0).waitFor();
//     await filters.productCards.nth(0).click();
//     await Promise.all([
//     //page.waitForEvent('load'),                  // waits for full page load
//     await page.waitForURL(url => url.toString() !== urlBefore, { timeout: 15000 })
//     ])
//     await pdp.clickFirstSizeButton();
//     await pdp.addToBag.scrollIntoViewIfNeeded();
//     await expect(pdp.addToBag).toBeVisible();
//     await pdp.addToBag.click();

//     await Promise.race([
//       pdp.miniCart.waitFor({ state: "visible", timeout: 10000 }),
//       pdp.stockQtyExceeded.waitFor({ state: "visible", timeout: 10000 })
//     ]);
    
//     const miniCartVisible = await pdp.miniCart.isVisible();
//     const stockMsgVisible = await pdp.stockQtyExceeded.isVisible();

//     expect(miniCartVisible || stockMsgVisible).toBeTruthy();

//     await page.goBack();
//     await page.waitForSelector("[data-testid*='product-card']", { timeout: 8000 });


// });
// })

