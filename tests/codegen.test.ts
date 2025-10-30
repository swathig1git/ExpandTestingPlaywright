import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.hover("//a[@data-toggle='dropdown']/div/span[contains(., 'My account')]");
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('swathi.g12025@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Edit your account' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'First Name *' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'First Name *' }).fill('Swathi');
  await page.getByRole('textbox', { name: 'Last Name*' }).click();
  await page.getByRole('textbox', { name: 'Last Name*' }).fill('Playwright');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.hover("//a[@data-toggle='dropdown']/div/span[contains(., 'My account')]");
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
});