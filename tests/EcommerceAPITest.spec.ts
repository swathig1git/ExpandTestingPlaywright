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
      await context.storageState({path:'state.json'})
      webContext = await browser.newContext({storageState:'state.json'})
})

test.describe("Page Object Test Demo", async() => {
      test.only(`Register test_01`, async({request})=>{

              
      const storageStatePath = 'state.json';
      const apiContext = await playwrightRequest.newContext({
                                    storageState: storageStatePath,
                                    });
      const response = await apiContext.post(
                        'https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart/add',
                        {
                              headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              },
                              data: new URLSearchParams({
                                    product_id: '36',
                                    quantity: '1',
                              }).toString(),
                        }
                  );
      
      console.log('Status:', response.status());
      console.log('Response:', await response.text());
      expect(response.status()).toBe(200);

      const checkoutResponse = await apiContext.get(
                                          'https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout'
                                          );

      console.log('Checkout status:', checkoutResponse.status());
      expect(checkoutResponse.status()).toBe(200);

      // Optional: print HTML for debugging
      const html = await checkoutResponse.text();
      console.log('Checkout page HTML snippet:', html.substring(0, 300));

      const browser = await chromium.launch({ headless: false }); // set to true for headless
      const context = await browser.newContext({
                        storageState: 'state.json',
                        });
      const page = await context.newPage();
      //page.route("**/*.css", route=>route.abort());
      page.route("**/*.webp", route=>route.abort());
      await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout');
      await page.waitForLoadState('networkidle');
      console.log('Checkout page loaded:', page.url());
      await page.waitForTimeout(5000);
      await browser.close();


      await apiContext.dispose();
      })

test('UI + API combined', async ({ browser }) => {

      const storageStatePath = 'state.json';
      const context = await browser.newContext({ storageState: storageStatePath });
      const page = await context.newPage();

      await page.request.post ('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart/add', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({ product_id: '36', quantity: '1' }).toString(),
      })

      // Now navigate — same context, so cookies carry over
      await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout');

      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(5000);


})
});

