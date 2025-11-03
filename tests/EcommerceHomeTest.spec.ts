import { Page, Browser, chromium } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { EcommerceBasePage } from "../pageObjectsTS/EcommerceBasePage.spec";
import { EcommerceRegisterPage } from "../pageObjectsTS/EcommerceRegisterPage.spec";
import { EcommerceAccountCreatedPage } from "../pageObjectsTS/EcommerceAccountCreatedPage.spec";
import { EcommerceItemsPage } from "../pageObjectsTS/EcommerceItemsPage.spec";
import { EcommercePageManager } from "../pageObjectsTS/EcommercePageManager.spec";
import { EcommerceLoginPage } from "../pageObjectsTS/EcommerceLoginPage.spec";
import { EcommerceMyAccountPage } from "../pageObjectsTS/EcommerceMyAccountPage.spec";
import jsonData from "../utils/loginData.json"

interface LoginData{
      email: string;
      password: string;
}

const loginData: LoginData[] = jsonData;


test.describe("Page Object Test Demo", async() => {
      loginData.forEach((login) =>{
      test(`Register test_01 ${login.email}`, async({page})=>{

            await page.goto('index.php?route=account/register');

            const ecommerceRegisterPage = new EcommerceRegisterPage(page);

            const firstName = "play";
            const lastName = "wright";
            const telephone = "1234567890";
            const passwordConfirm = "pass123";
            const newsLetterSubscribe = true;
            const privacyPolicy = true;
            await ecommerceRegisterPage.enterFirstName(firstName);
            await ecommerceRegisterPage.enterLastName(lastName);
            await ecommerceRegisterPage.enterEmail(login.email);
            await ecommerceRegisterPage.enterTelephone(telephone);
            await ecommerceRegisterPage.enterPassword(login.password);
            await ecommerceRegisterPage.enterConfirmPassword(login.password);
            await ecommerceRegisterPage.enterEmail(login.email);
            await ecommerceRegisterPage.enterPrivacyPolicy(privacyPolicy);
            await ecommerceRegisterPage.pressContinue();

            const ecommerceAccountCreatedPage = new EcommerceAccountCreatedPage(page);

            const headerText = await ecommerceAccountCreatedPage.getHeaderText();
            await expect (headerText).toBe("Your Account Has Been Created!")

      })

      test(`Login test_02${login.email}`, async({page})=>{
            await page.goto('index.php?route=account/login');
            const ecommerceLoginPage = new EcommerceLoginPage(page);
            await ecommerceLoginPage.enterEmail(login.email);
            await ecommerceLoginPage.enterPassword(login.password);
            await ecommerceLoginPage.login();

            const ecommerceMyAccountPage = new EcommerceMyAccountPage(page);
            const headerMessage = await ecommerceMyAccountPage.getMyAccountHeaderMessage();
            await expect (headerMessage).toBe("My Account");


      })



      test(`Ecommerce End To End test ${login.email}`, async function ({ browser }: { browser: Browser }) {

            const context = await browser.newContext();
            const page: Page = await context.newPage();

            const firstName = "play";
            const lastName = "wright";
            const telephone = "1234567890";
            const password = "pass123";
            const passwordConfirm = "pass123";
            const newsLetterSubscribe = true;
            const privacyPolicy = false;

            const ecommercePageManager = new EcommercePageManager(page);
            const ecommerceHomePage = await ecommercePageManager.getHomePage();
            await ecommercePageManager.launchApplication();
            await ecommerceHomePage.goToRegisterUser();

            const ecommerceRegisterPage = await ecommercePageManager.getRegisterPage();

            await ecommerceRegisterPage.registerUser(firstName,
                              lastName,
                              login.email,
                              telephone,
                              password,
                              passwordConfirm,
                              newsLetterSubscribe,
                              privacyPolicy);

            const ecommerceAccountCreatedPage = await ecommercePageManager.getAccountCreatedPage();
            await ecommerceAccountCreatedPage.goToApple();
            const ecommerceItemsPage = await ecommercePageManager.getItemsPage();
            await ecommerceItemsPage.addItemToCart("iPod Shuffle");
            await ecommerceItemsPage.checkoutCart();

            await page.waitForTimeout(5000);
      })
})
});

