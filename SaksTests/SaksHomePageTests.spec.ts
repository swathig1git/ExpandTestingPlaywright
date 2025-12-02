// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { test } from '../base/fixtureSaks.spec';

test.describe('Saks Home Page @regression', () => {
test('Womens: Designer Drop Down Verification', async ({ page }) => {
  const saksHomePage = new SaksHomePage(page);

  await saksHomePage.designerDropdown.hover();
  await expect(saksHomePage.featuredDesigners).toBeVisible();
  expect (await saksHomePage.allFeaturedDesigners.count()).toBe(10);
  await expect (saksHomePage.shopAllDesigners).toBeVisible();
})
});

test.describe('Saks Home Page @regression', () => {
test('Mens: Designer Drop Down Verification', async ({ page }) => {
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.men.click();

  await expect(page).toHaveURL("https://ca.saks.com/en-ca/men");
  await saksHomePage.designerDropdown.hover();
  await expect(saksHomePage.featuredDesigners).toBeVisible();
  expect (await saksHomePage.allFeaturedDesigners.count()).toBe(7);
  await expect (saksHomePage.shopAllDesigners).toBeVisible();
})
});

test.describe('Saks Home Page @flaky', () => {
  test.describe.configure({ retries: 2, timeout: 180_000 });

  test('Womens: Designer Brand Page Opening Verification', async ({ page, popUpOver }) => {
    await expect.poll(() => popUpOver.value, { timeout: 30_000 }).toBe(true);

    const saksHomePage = new SaksHomePage(page);

    await saksHomePage.designerDropdown.hover();
    await expect(saksHomePage.allFeaturedDesigners).toHaveCount(10);
    await expect(saksHomePage.shopAllDesigners).toBeVisible();

    const names = await saksHomePage.allFeaturedDesigners.allTextContents();

    for (const name of names) {
      const urlName = name
        .toLowerCase()
        .replace(/ \+ /g, '-')
        .replace(/&/g, 'and')
        .replace(/à/g, 'a')
        .replace(/'/g, '')
        .replace(/ /g, '-');

      await saksHomePage.clickOnBrandLink(name);

      await expect(page).toHaveURL(
        new RegExp(`https://ca\\.saks\\.com/en-ca/women/designers/${urlName}`)
      );

      await page.goBack();
      await expect(page).toHaveURL('https://ca.saks.com/en-ca/');

      await saksHomePage.designerDropdown.hover();
      await expect(saksHomePage.shopAllDesigners).toBeVisible();
    }
  });
});
test.describe('Saks Home Page @flaky', () => {
   test.describe.configure({ retries: 2, timeout: 180_000 });
test('Mens: Designer Brand Page Opening Verification', async ({ page, popUpOver }) => {
  await expect.poll(() => popUpOver.value).toBe(true);
  test.setTimeout(180000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);
  await saksHomePage.men.click();

  await saksHomePage.designerDropdown.hover();
  expect (await saksHomePage.allFeaturedDesigners.count()).toBe(7);
  await expect (saksHomePage.shopAllDesigners).toBeVisible();

  const names = await saksHomePage.allFeaturedDesigners.allTextContents();
  console.log(names);

  for (const name of names) {
    let urlName = name.toLowerCase();

    urlName = urlName
              .replace(/ \+ /g, "-")
              .replace(/ /g, "-")   // replace all spaces with '-'
              .replace(/'/g, "")
              .replace(/à/g, "a")
              .replace(/&/g, "and")
              ;   // remove all apostrophes

    console.log(urlName);
    await saksHomePage.clickOnBrandLink(name);
    const currentUrl = page.url();
    expect(
      currentUrl === `https://ca.saks.com/en-ca/men/designers/${urlName}` ||
      currentUrl === `https://ca.saks.com/en-ca/men/clothing?brand=${urlName}`
    ).toBeTruthy();

    await page.goBack();
    await expect(page).toHaveURL("https://ca.saks.com/en-ca/men");
    await saksHomePage.designerDropdown.hover();
    await expect (saksHomePage.shopAllDesigners).toBeVisible();
  }
})
})
