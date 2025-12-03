// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksDesignerBrandListPage } from '../SaksPageObjects/SaksDesignerBrandListPage';
import { test } from '../base/fixtureSaks.spec';

test.describe('Saks Home Page @regression', () => {
test('Womens: Designer Brand List Verification', async ({ page, homePage }) => {
  await homePage.designerDropdown.hover();
  await homePage.shopAllDesigners.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/designers");

});
})
test.describe('Saks Home Page @regression', () => {
test('Womens: Designer Brand List Scroll Verification', async ({ page, popUpOver, discountPopupClosed, cookiePopupClosed, designerList }) => {
  await page.goto("https://ca.saks.com/en-ca/women/designers");
  await expect.poll(() => popUpOver.value, { timeout: 30_000 }).toBe(true);
  await expect.poll(() => cookiePopupClosed.value, { timeout: 30_000 }).toBe(true);

  designerList.brandIndexLetter_J.scrollIntoViewIfNeeded();
  designerList.brandIndexLetter_J.click();
  await expect(designerList.firstElement_J).toBeInViewport({timeout: 15000});
  let jTop = await designerList.firstElement_J.evaluate(el => el.getBoundingClientRect().top);
  console.log("J TOP:", jTop);
  expect(jTop).toBeLessThan(180);


  await designerList.brandIndexLetter_M.scrollIntoViewIfNeeded();
  await designerList.brandIndexLetter_M.click();
  await expect(designerList.firstElement_M).toBeInViewport({timeout: 15000});

  const mTop = await designerList.firstElement_M.evaluate(el => el.getBoundingClientRect().top);
  console.log("M TOP:", mTop);
  expect(mTop).toBeLessThan(180);

})
})
