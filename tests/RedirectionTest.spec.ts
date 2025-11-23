import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"

test('Redirection verify', async ({ page }) => {

  await page.goto('https://www.lambdatest.com/selenium-playground/redirection');

  await page.click('a.text-lambda-900'); // example: link or button

  // Wait for navigation
  await page.waitForURL('https://www.lambdatest.com/selenium-playground/'); 

  // Verify the URL
  expect(page.url()).toBe('https://www.lambdatest.com/selenium-playground/');

});

