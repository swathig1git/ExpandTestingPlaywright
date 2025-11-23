import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { ShadowDOMPage } from "../pageObjectsTS/ShadowDOMPage.spec";

test('Fill shadow DOM inputs and verify', async ({ page }) => {
  const shadowPage = new ShadowDOMPage(page);

  await page.goto('https://www.lambdatest.com/selenium-playground/shadow-dom');

  // Wait for shadow host to be attached
 // await page.locator('#shadow_host').waitFor({ state: 'attached' });


await shadowPage. shadowHost.waitFor({ state: 'attached' });
await shadowPage.name.waitFor({ state: 'visible' });
await shadowPage.name.fill('John');
await shadowPage.email.waitFor({ state: 'visible' });
await shadowPage.email.fill('John@test.com');

let email = await shadowPage.email.inputValue();
console.log("email = " , email);

await shadowPage.shadowHost1.waitFor({ state: 'attached' });
await shadowPage.userName.waitFor({ state: 'visible' });
await shadowPage.userName.fill('John');
await shadowPage.emailAddress.waitFor({ state: 'visible' });
await shadowPage.emailAddress.fill('John@test.com');
await shadowPage.password.waitFor({ state: 'visible' });
await shadowPage.password.fill('password');
await shadowPage.confirmPassword.waitFor({ state: 'visible' });
await shadowPage.confirmPassword.fill('password');

email = await shadowPage.emailAddress.inputValue();
console.log("email = " , email);

await page.pause()


});

