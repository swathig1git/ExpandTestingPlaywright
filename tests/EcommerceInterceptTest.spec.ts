import { Page, Browser, chromium, BrowserContext } from "playwright-core";
import{test, expect, request as playwrightRequest} from "@playwright/test"
import { EcommerceLoginPage } from "../pageObjectsTS/EcommerceLoginPage.spec";


const email: string = "play.wright6@gmail.com";
const password: string = "pass123";

let webContext: BrowserContext;


test.beforeAll(async ({browser})=>{
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('index.php?route=account/login');
      const ecommerceLoginPage = new EcommerceLoginPage(page);
      await ecommerceLoginPage.enterEmail(email);
      await ecommerceLoginPage.enterPassword(password);
      await ecommerceLoginPage.login();
      await page.waitForLoadState("networkidle");
      await context.storageState({path:'state.json'})
      webContext = await browser.newContext({storageState:'state.json'})
})

test.describe("Page Object Test Demo", async() => {
      test('Intercept and mock cart as empty', async ({ browser }) => {
      const storageStatePath = 'state.json';
      const context = await browser.newContext({ storageState: storageStatePath });
      const page = await context.newPage();

      // Intercept the cart page request
      await page.route('**/index.php?route=checkout/cart*', async (route) => {
      // Fetch the real response first
      const original = await route.fetch();
      let body = await original.text();

      // Replace product table or totals with "empty cart" HTML
      body = body.replace(/<table[\s\S]*<\/table>/, `
            <p class="m-0 py-5 text-center">Your shopping cart is empty!!</p>
            <table class="table mb-0">
            <tr><td>Sub-Total:</td><td class="text-right"><strong>$0.00</strong></td></tr>
            <tr><td>Total:</td><td class="text-right"><strong>$0.00</strong></td></tr>
            </table>
      `);

            console.log("body = ", body);

      // Continue the request with modified response
      await route.fulfill({
            response: original,
            body,
            headers: original.headers(),
      });
      });



      // Go to cart page — it will now always show as empty
      await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
      await page.waitForLoadState('networkidle');



      // Validate the modified content
      await expect(page.locator('text=Your shopping cart is empty!!')).toBeVisible();

      await page.waitForTimeout(5000);
      });


});

