// SaksHomePageTests.spec.ts
import { expect } from '@playwright/test';
import { SaksHomePage } from '../SaksPageObjects/SaksHomePage';
import { test } from '../base/fixtureSaks.spec';

test('Designer Drop Down Verification', async ({ page }) => {
  const saksHomePage = new SaksHomePage(page);

  await saksHomePage.designerDropdown.hover();
  await expect(saksHomePage.featuredDesigners).toBeVisible();
  expect (await saksHomePage.allFeaturedDesigners.count()).toBe(10);
  await expect (saksHomePage.shopAllDesigners).toBeVisible();
});

test('Designer Brand Page Opening Verification', async ({ page }) => {
  test.setTimeout(120000); // 120 seconds
  const saksHomePage = new SaksHomePage(page);

  await saksHomePage.designerDropdown.hover();
  expect (await saksHomePage.allFeaturedDesigners.count()).toBe(10);
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
    await expect(page).toHaveURL("https://ca.saks.com/en-ca/women/designers/" + urlName);
    await page.goBack();
    await expect(page).toHaveURL("https://ca.saks.com/en-ca/");
    await saksHomePage.designerDropdown.hover();
    await expect (saksHomePage.shopAllDesigners).toBeVisible();
  }
});
