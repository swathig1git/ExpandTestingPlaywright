// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { SaksDesignerBrandListPage } from '../SaksPageObjects/SaksDesignerBrandListPage';
import { test } from '../base/fixtureSaks.spec';

test.describe('Saks Home Page @regression', () => {
test('Womens: Designer Brand List Verification', async ({ page }) => {
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.designerDropdown.hover();
  await saksHomePage.shopAllDesigners.click();
  await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/designers");

});
})
test.describe('Saks Home Page @regression @debugging', () => {
test('Womens: Designer Brand List Scroll Verification', async ({ page, popUpOver }) => {
  await expect.poll(() => popUpOver.value, { timeout: 30_000 }).toBe(true);
  await page.goto("https://ca.saks.com/en-ca/women/designers");
  
  const designerBrandListPage = new SaksDesignerBrandListPage(page);
  designerBrandListPage.brandIndexLetter_J.scrollIntoViewIfNeeded();
  designerBrandListPage.brandIndexLetter_J.click();
  await expect(designerBrandListPage.firstElement_J).toBeInViewport({timeout: 15000});
  let jTop = await designerBrandListPage.firstElement_J.evaluate(el => el.getBoundingClientRect().top);
  console.log("J TOP:", jTop);
  expect(jTop).toBeLessThan(180);


  await designerBrandListPage.brandIndexLetter_M.scrollIntoViewIfNeeded();
  await designerBrandListPage.brandIndexLetter_M.click();
  await expect(designerBrandListPage.firstElement_M).toBeInViewport({timeout: 15000});

  const mTop = await designerBrandListPage.firstElement_M.evaluate(el => el.getBoundingClientRect().top);
  console.log("M TOP:", mTop);
  expect(mTop).toBeLessThan(180);

})
})
